function NoteCard({ note, deleteNote }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>

      <p>{note.content}</p>

      <div className="note-actions">
        <button
          onClick={() => deleteNote(note._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;