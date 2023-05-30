import "./pages.css";
import Header from "./../components/header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = (e) => {
    e.preventDefault();
    console.log(username, password);

    const options = {
      url: "http://localhost:3001/user/login",
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: username,
        password: password,
      },
    };

    axios(options).then((res) => {
      if (res.status === 200) {
        navigate("/books");
      } else {
        console.log("Error", res);
      }
    });
  };
  return (
    <>
      <Header />
      <main>
        <section class="login-section">
          <h2>Login</h2>
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
            <button type="submit" class="btn">
              Log In
            </button>
          </form>
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </section>
      </main>
    </>
  );
};

export default Login;
