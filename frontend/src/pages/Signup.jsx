import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/signup",
        {
          name,
          email,
          password
        }
      );

      localStorage.setItem(
        "verify_email",
        email
      );

      alert(response.data.message);

      navigate("/verify-otp");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#111111",
          padding: "30px",
          borderRadius: "12px",
          color: "white",
        }}
      >
        <h1>NoteHub</h1>

        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <br /><br />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <br /><br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <br /><br />

          <button type="submit">
            Create Account
          </button>

        </form>

        <p>
          Already have an account?
          <Link to="/">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;