import { FiGrid } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";

function Sidebar({ logout }) {

  return (

    <div className="sidebar">

      <div>

        <div className="logo">
          <h1>
            Note<span>Hub</span>
          </h1>

          <p>STUDENT NOTES APP</p>
        </div>

        <ul>

          <li className="active">
            <FiGrid />
            Dashboard
          </li>

          <li>
            <FiFileText />
            My Notes
          </li>

        </ul>

      </div>

      <button
        className="logout-btn"
        onClick={logout}
      >
        <FiLogOut />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;