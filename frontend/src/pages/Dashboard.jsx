import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NoteCard from "../components/NoteCard";

import "../styles/Dashboard.css";
import "../styles/Navbar.css";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");
  const [showModal,setShowModal] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const fetchNotes = async () => {
    try {
      const response = await api.get("/notes");

      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createNote = async (e) => {
    e.preventDefault();

    try {
      await api.post("/notes", {
        title,
        content,
      });

      setTitle("");
      setContent("");

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, []);

  if (!token) return null;

  return (
    <div className="dashboard-container">

      <Navbar
        user={user}
        logout={logout}
      />

      <div className="dashboard-layout">

        <Sidebar
          logout={logout}
        />

        <div className="main-content">

          <h1>My Notes</h1>

          <button
            className="add-note-btn"
                    onClick={() => setShowModal(true)}>
                + Add New Note
                    </button>

          <div className="notes-grid">

            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                deleteNote={deleteNote}
              />
            ))}

          </div>

        {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>Create New Note</h2>

            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />

            <textarea
              placeholder="Write your note..."
              value={content}
              onChange={(e)=>setContent(e.target.value)}
            />

            <div className="modal-actions">

              <button
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                onClick={(e)=>{
                  createNote(e);
                  setShowModal(false);
                }}
              >
                Save Note
              </button>

            </div>

          </div>

        </div>

        )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;