import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        `/auth/login?email=${email}&password=${password}`
      );

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      navigate("/");
    } catch (err) {
      setError(
        "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>🚀 TaskPilot AI</h1>

        <p>
          Sign in to continue
        </p>

        <form
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            type="submit"
          >
            Login
          </button>
        </form>

        {error && (
          <p
            style={{
              color: "red",
              marginTop: "15px",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}