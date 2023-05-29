/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./../components/header";
import Footer from "../components/footer";
import { useNavigate, useParams } from "react-router-dom";
import "./pages.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
const IssueBook = () => {
  const navigate = useNavigate();
  const { bookId, userId } = useParams();

  const [days, setDays] = useState("");

  useEffect(() => {
    if (!Cookies.get("jwt")) {
      navigate("/");
    }
  }, []);

  const submit = (e) => {
    e.preventDefault();
    let options = {
      url: "http://localhost:3001/books/request",
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        userId: userId,
        bookId: bookId,
        issueDays: days,
      },
    };
    axios(options)
      .then((res) => {
        navigate("/books");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div className="container center">
        <div className="white form card row">
          <form method="post" className="col s12">
            <h5>Enter Details</h5>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="text"
                  placeholder="Issue Days"
                  name="issueDays"
                  className="validate"
                  maxLength="2"
                  value={days}
                  onChange={(e) => {
                    setDays(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              style={{}}
              className="btn-small margin-1 round-border"
              onClick={(e) => {
                submit(e);
              }}
            >
              Save
              <BiSave />
            </button>
            <a className="btn-small red margin-1 round-border" href="/books">
              Cancel
              <MdCancel />
            </a>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default IssueBook;
