function Sidebar({ logout }) {
  return (
    <div className="sidebar">
      <h2>NoteHub</h2>

      <ul>
        <li>Dashboard</li>
        <li>My Notes</li>
      </ul>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;