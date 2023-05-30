/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import "./pages.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [requestedBooks, setRequestedBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);

  const goBack = () => {
    navigate(-1); };
  
  const issueBook = (bookId, userId, issueDays) => {
    let options = {
      url: "http://localhost:3001/books/issue",
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        bookId,
        userId,
        issueDays,
      },
    };

    axios(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rejectBook = (bookId, userId) => {
    let options = {
      url: `http://localhost:3001/books/request/${bookId}/delete/${userId}`,
      method: "DELETE",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      .then(async (res) => {
        try {
          setUser(res.data.user);

          console.log(res.data.user);
          if (res.data.user.role === "student") {
            options = {
              url: `http://localhost:3001/books/request/${res.data.user.id}`,
              method: "GET",
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            };

            axios(options).then((res) => {
              console.log(res.data.books);
              setRequestedBooks(res.data.books);
            });

            options = {
              url: `http://localhost:3001/books/issue/${res.data.user.id}`,
              method: "GET",
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            };

            axios(options).then((res) => {
              console.log(res.data.books);
              setIssuedBooks(res.data.books);
            });
          } else if (res.data.user.role === "admin") {
            options = {
              url: `http://localhost:3001/books/request`,
              method: "GET",
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            };

            axios(options).then((res) => {
              console.log(res.data.books);
              setRequestedBooks(res.data.books);
            });

            options = {
              url: `http://localhost:3001/books/issue`,
              method: "GET",
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            };

            axios(options).then((res) => {
              console.log(res.data.books);
              setIssuedBooks(res.data.books);
            });
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => {
        navigate("/");
      });
  }, []);
  if (user.role === "student") {
    return (
      <>
        <Header logout={true} />
        <main>
          <section class="user-section">
            <h2>Welcome , {user.name}!</h2>
            <p>User Type: {user.role} </p>
            {requestedBooks.length > 0 ? (
              <>
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
                    {requestedBooks?.map((book) => (
                      <tr>
                        <td>{book.bookId.name}</td>
                        <td>{book.bookId.author}</td>
                        <td>{book.bookId.price}</td>
                        <td>{book.issueDays}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <></>
            )}
            {issuedBooks.length > 0 ? (
              <>
                <h3>List of Issued Books:</h3>
                <table class="highlight white card">
                  <thead>
                    <tr>
                      <th>Book Name</th>
                      <th>Author</th>
                      <th>Price</th>
                      <th>Issue Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issuedBooks?.map((book) => (
                      <tr>
                        <td>{book.bookId.name}</td>
                        <td>{book.bookId.author}</td>
                        <td>{book.bookId.price}</td>
                        <td>{book.issueDays}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <></>
            )}
          </section>
        </main>
        <Footer />
      </>
    );
  } else if (user.role === "admin") {
    return (
      <>
        <Header logout={true} />
        <main>
          <section class="user-section">
            <h2>Welcome , {user.name}!</h2>
            <p>User Type: {user.role} </p>
            {requestedBooks.length > 0 ? (
              <>
                <h3>List of all Requested Books:</h3>
                <button className="btn" onClick={goBack}>
            Go Back
          </button>
                <table class="highlight white card">
                  <thead>
                    <tr>
                      <th>Book Name</th>
                      <th>Author</th>
                      <th>Price</th>
                      <th>Issue Days</th>
                      <th>Requested By</th>
                      <th>Actions</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestedBooks?.map((book) => (
                      <tr>
                        <td>{book.bookId.name}</td>
                        <td>{book.bookId.author}</td>
                        <td>{book.bookId.price}</td>
                        <td>{book.issueDays}</td>
                        <td>{book.userId.name}</td>
                        <td>
                          <a
                            className="btn-floating btn-small waves-effect waves-light blue"
                            onClick={() => {
                              issueBook(
                                book.bookId.id,
                                book.userId.id,
                                book.issueDays
                              );
                            }}
                          >
                            <BiBookAdd />
                          </a>
                        </td>
                        <td>
                          <a
                            className="btn-floating btn-small waves-effect waves-light red"
                            onClick={(e) => {
                              rejectBook(book.bookId.id, book.userId.id);
                            }}
                          >
                            <MdDelete />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <></>
            )}
            {issuedBooks.length > 0 ? (
              <>
                <h3>List of All Issued Books:</h3>
                <table class="highlight white card">
                  <thead>
                    <tr>
                      <th>Book Name</th>
                      <th>Author</th>
                      <th>Price</th>
                      <th>Issued By</th>
                      <th>Issue Days</th>
                      <th>Issue Date</th>
                      <th>Return Date</th>
                      <th>Fine</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issuedBooks?.map((book) => (
                      <tr>
                        <td>{book.bookId.name}</td>
                        <td>{book.bookId.author}</td>
                        <td>{book.bookId.price}</td>
                        <td>{book.userId.name}</td>
                        <td>{book.issueDays}</td>
                        <td>{book.issueDate}</td>
                        <td>{book.returnDate}</td>
                        <td>{book.fine}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <></>
            )}
          </section>
        </main>
        <Footer />
      </>
    );
  }
};
export default Account;
