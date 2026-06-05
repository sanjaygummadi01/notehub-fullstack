function Navbar({ user, logout }) {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        NoteHub
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search notes..."
        />
      </div>

      <div className="navbar-user">
        <span>{user?.name}</span>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;