/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import "./pages.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

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
        setUser(res.data.user);
      })
      .catch((err) => {
        navigate("/");
      });
  }, []);
  if (user) {
    console.log(user);
  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
    return (
      <>
        <Header logout={true} />
        <main>
          <section class="user-section">
            <h2>Welcome , {user.name}!</h2>
            <p>User Type: {user.role} </p>
            <h3>List of Requested Books:</h3>
            <button className="btn" onClick={goBack}>
            Go Back
          </button>
            <table class="highlight white card">
              <thead>
                <tr>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Price(Rupees)</th>
                  <th>Issue Days</th>
                </tr>
              </thead>
              <tbody>
                {user.requestedBooks?.map((book) => (
                  <tr>
                    <td>{book.book.name}</td>
                    <td>{book.book.author}</td>
                    <td>{book.book.price}</td>
                    <td>{book.issueDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
        <Footer />
      </>
    );
  }
};
export default Account;
