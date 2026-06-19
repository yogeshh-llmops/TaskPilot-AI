import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        null,
        {
          params: {
            email,
            password,
          },
        }
      );

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>🚀 TaskPilot AI</h1>

        <p>
          Sign in to continue
        </p>

        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
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

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}