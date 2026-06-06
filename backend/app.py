from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import bcrypt
import jwt
from functools import wraps
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
app.config["MAIL_DEBUG"] = True
app.config["MAIL_SUPPRESS_SEND"] = False


CORS(app)

SECRET_KEY = os.getenv("SECRET_KEY")

client = MongoClient(
    os.getenv("MONGO_URI"),
    serverSelectionTimeoutMS=5000
)

client.server_info()

db = client["notehub"]

users_collection = db["users"]
notes_collection = db["notes"]
pending_users_collection = db["pending_users"]

def token_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        token = request.headers.get("Authorization")

        if not token:
            return jsonify({
                "message": "Token Missing"
            }), 401

        try:

            token = token.split(" ")[1]

            data = jwt.decode(
                token,
                SECRET_KEY,
                algorithms=["HS256"]
            )

            request.user_email = data["email"]

        except:
            return jsonify({
                "message": "Invalid Token"
            }), 401

        return f(*args, **kwargs)

    return decorated


@app.route("/")
def home():
    return "Backend Running"


@app.route("/signup", methods=["POST"])
def signup():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    existing_user = users_collection.find_one({
        "email": email
    })

    if existing_user:
        return jsonify({
            "message": "User already exists"
        }), 400

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password
    })

    return jsonify({
        "message": "Account Created Successfully"
    }), 201


@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({
        "email": email
    })

    if not user:
        return jsonify({
            "message": "Invalid Credentials"
        }), 401

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"]
    ):
        return jsonify({
            "message": "Invalid Credentials"
        }), 401

    token = jwt.encode(
        {
            "email": email,
            "exp": datetime.utcnow() + timedelta(days=1)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "message": "Login Successful",
        "token": token,
        "name": user["name"]
    })


@app.route("/notes", methods=["POST"])
@token_required
def create_note():

    data = request.json

    notes_collection.insert_one({
        "email": request.user_email,
        "title": data["title"],
        "content": data["content"]
    })

    return jsonify({
        "message": "Note Created"
    })


@app.route("/notes", methods=["GET"])
@token_required
def get_notes():

    notes = []

    for note in notes_collection.find({
        "email": request.user_email
    }):

        notes.append({
            "_id": str(note["_id"]),
            "title": note["title"],
            "content": note["content"]
        })

    return jsonify(notes)


@app.route("/notes/<id>", methods=["DELETE"])
@token_required
def delete_note(id):

    result = notes_collection.delete_one({
        "_id": ObjectId(id),
        "email": request.user_email
    })

    return jsonify({
        "message": "Note Deleted",
        "deleted_count": result.deleted_count
    })


if __name__ == "__main__":
    app.run(debug=True)