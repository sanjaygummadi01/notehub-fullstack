import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyOtp() {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const email =
    localStorage.getItem("verify_email");

  const handleVerify = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/verify-otp",
        {
          email,
          otp
        }
      );

      alert(response.data.message);

      localStorage.removeItem(
        "verify_email"
      );

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Verification Failed"
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
        <h1>Verify OTP</h1>

        <p>
          Enter OTP sent to:
        </p>

        <p>{email}</p>

        <form onSubmit={handleVerify}>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
          />

          <br /><br />

          <button type="submit">
            Verify OTP
          </button>

        </form>

      </div>
    </div>
  );
}

export default VerifyOtp;