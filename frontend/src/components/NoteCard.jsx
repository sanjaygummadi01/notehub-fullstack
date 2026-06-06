import { FiTrash2 } from "react-icons/fi";

function NoteCard({ note, deleteNote }) {

  return (

    <div className="note-card">

      <h3>
        {note.title}
      </h3>

      <p>
        {note.content}
      </p>

      <button
        className="delete-btn"
        onClick={() => deleteNote(note._id)}
      >
        <FiTrash2 />
      </button>

    </div>

  );
}

export default NoteCard;