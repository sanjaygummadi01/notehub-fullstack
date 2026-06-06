import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css";
function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://notehub-fullstack.onrender.com/signup",
        {
          name,
          email,
          password
        }
      );

      alert(response.data.message);

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>NoteHub</h1>

        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

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