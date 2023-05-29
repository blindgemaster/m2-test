/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import "./pages.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
// import "./../materialize.css";
// import "./../materialize.min.css";
import "./pages.css";
import { BsFillBookFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";

const Books = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [books, setBooks] = useState([]);

  const deleteBook = (e, id) => {
    e.preventDefault();
    let options = {
      url: "http://localhost:3001/books/delete",
      method: "DELETE",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        userId: user.id,
        bookId: id,
      },
    };
    axios(options).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    // Getting User
    const token = Cookies.get("jwt");
    if (token) {
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

      // Getting Books

      options = {
        url: "http://localhost:3001/books",
        method: "GET",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(options).then((res) => {
        console.log(res);
        setBooks(res.data.books);
      });
    }
  }, []);

  if (user) {
    return (
      <>
        <Header user={user} />
        <div className="container" style={{ minHeight: "75vh" }}>
          <div className="">
            {books.length > 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h6 className="grey-text">
                    Total number of books:
                    <span className="blue-text">{books.length}</span>
                  </h6>
                </div>
                <table className="highlight white card">
                  <thead>
                    <tr>
                      <th>Book Name</th>
                      <th>Author</th>
                      <th>Price(Pounds)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book, i) => (
                      <tr key={i}>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.price}£</td>
                        {user.role === "admin" || user.role === "superadmin" ? (
                          <>
                            <td>
                              <a
                                className="btn-floating btn-small waves-effect waves-light blue"
                                href={`/books/edit/${book.id}`}
                              >
                                <AiFillEdit />
                              </a>
                            </td>
                            <td>
                              <button
                                className="btn-floating btn-small waves-effect waves-light red"
                                onClick={(e) => {
                                  deleteBook(e, book.id);
                                }}
                              >
                                <MdDelete />
                              </button>
                            </td>
                          </>
                        ) : (
                          <td>
                            <a
                              className="btn-floating btn-small waves-effect waves-light green"
                              href={`/books/issue/${book.id}/${user.id}`}
                            >
                              <BiBookAdd className="material-icons">
                                add
                              </BiBookAdd>
                            </a>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {user.role === "admin" || user.role === "superadmin" ? (
                  <a
                    href="/books/add"
                    className="btn-small light-blue lighten-1"
                    style={{ borderRadius: "2rem" }}
                  >
                    Add Book
                  </a>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <div
                  className="center"
                  // style={{ display: "flex", flexDirection: "column" }}
                >
                  <BsFillBookFill
                    // className="material-icons"
                    style={{ fontSize: "20rem", color: "grey" }}
                  ></BsFillBookFill>
                  <h4 className="" style={{ color: "#424242" }}>
                    Library is Empty!
                  </h4>
                  <h6 style={{ color: "#424242" }}>
                    To add a book
                    <a
                      href="/books/add"
                      className="btn-small light-blue lighten-1"
                      style={{ borderRadius: "2rem" }}
                    >
                      Click Me
                    </a>
                  </h6>
                </div>
              </>
            )}
          </div>
        </div>
        <Footer />
      </>
    );
  }
};
export default Books;
