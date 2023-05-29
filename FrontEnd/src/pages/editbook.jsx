/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate, useParams } from "react-router-dom";
import "./pages.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";

const EditBook = () => {
  const [book, setBook] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    console.log(id);
    const options = {
      url: `http://localhost:3001/books/${id}`,
      method: "GET",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(options).then((res) => {
      if (res.status === 200) {
        setBook(res.data.book);
        setName(res.data.book.name);
        setAuthor(res.data.book.author);
        setPrice(res.data.book.price);
      }
    });
  }, []);

  const submit = (e) => {
    e.preventDefault();

    const options = {
      url: "http://localhost:3001/books/update",
      method: "PUT",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: name,
        author: author,
        price: price,
        bookId: id,
      },
    };

    axios(options)
      .then((res) => {
        if (res.status === 200) {
          navigate("/books");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {book ? (
        <>
          <Header />
          <div className="container center">
            <div className="white form card row">
              <form
                method="post"
                style={{ padding: "45px 20px" }}
                className="col s12"
                onSubmit={(e) => {
                  submit(e);
                }}
              >
                <h5>Enter book details</h5>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      type="text"
                      name="Name"
                      placeholder="Name"
                      className="validate"
                      minLength="3"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="input-field col s12">
                    <input
                      type="text"
                      name="Author"
                      placeholder="Author Name"
                      minLength="3"
                      value={author}
                      onChange={(e) => {
                        setAuthor(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="input-field col s12">
                    <input
                      type="number"
                      name="Price"
                      placeholder="Price"
                      min="100"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  style={{}}
                  className="btn-small margin-1 round-border"
                >
                  Save
                  <BiSave />
                </button>
                <a
                  className="btn-small red margin-1 round-border"
                  href="/books"
                >
                  Cancel
                  <MdCancel />
                </a>
              </form>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default EditBook;
