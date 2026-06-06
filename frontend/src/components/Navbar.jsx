import { FiSearch } from "react-icons/fi";

function Navbar({ user }) {

  return (

    <div className="navbar">

      <div>

        <h1>Dashboard</h1>

        <p>
          Organize and manage your notes easily.
        </p>

      </div>

      <div className="navbar-right">

        <div className="search-box">

          <FiSearch />

          <input
            type="text"
            placeholder="Search notes..."
          />

        </div>

        <div className="profile">

          <div className="avatar">
            {user?.name?.charAt(0)}
          </div>

        </div>

      </div>

    </div>

  );
}

export default Navbar;