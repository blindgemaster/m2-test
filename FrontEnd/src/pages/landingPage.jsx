/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./../components/header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./pages.css";
import axios from "axios";
const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("jwt");
    let options = {
      url: "http://localhost:3001/user/isLoggedIn/" + token,
      method: "GET",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(options)
      .then((res) => {
        navigate("/books");
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <Header />
      <main>
        <section class="hero">
          <div class="hero-content">
            <h2>Welcome to our Library!</h2>
            <p>Manage your books and borrow from our vast collection.</p>
            <a href="/login" class="btn-small">
              Log In
            </a>
            <a href="/signup" class="btn-small">
              Sign Up
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Library Management System. All rights reserved.</p>
      </footer>
    </>
  );
};
export default LandingPage;
