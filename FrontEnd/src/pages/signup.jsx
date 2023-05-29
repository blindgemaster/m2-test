import "./pages.css";
import Header from "./../components/header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Signup = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("student");
  const [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    console.log(username, password, confirmPassword, type);
    if (password !== confirmPassword) {
      setError("Password And Confirm Password Must Be Same");
      setTimeout(() => {
        setError("");
      }, 1000);
    } else {
      const options = {
        url: "http://localhost:3001/user/create",
        method: "POST",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: username,
          password: password,
          role: type,
        },
      };

      axios(options).then((res) => {
        if (res.status === 200 || res.status === 201) {
          navigate("/books");
        } else {
          console.log("Error", res);
        }
      });
    }
  };
  return (
    <>
      <Header />
      <main>
        <section class="signup-section">
          <h2>Sign Up</h2>
          <form
            onSubmit={(e) => {
              submit(e);
            }}
          >
            <div class="form-group">
              <label for="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <div class="form-group">
              <label for="confirm-password">Confirm Password:</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
              />
            </div>
            <div class="form-group">
              <select
                name="userType"
                id="userType"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
            <button type="submit" class="btn">
              Sign Up
            </button>
            <div className="error">{error}</div>
          </form>
          <p>
            Already have an account? <a href="/login" style={{ color: "#421010" }}>Log In</a>
          </p>
        </section>
      </main>
    </>
  );
};

export default Signup;
