import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditBook from "./pages/editbook";
import LandingPage from "./pages/landingPage.jsx";
import Login from "./pages/login.jsx";
import SignUp from "./pages/signup";
import Books from "./pages/books";
import AddBook from "./pages/addBook";
import Account from "./pages/account";
import IssueBook from "./pages/issueBook";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={() => <LandingPage />} />
        <Route path="/login" Component={() => <Login />} />
        <Route path="/signup" Component={() => <SignUp />} />
        <Route path="/books" Component={() => <Books />} />
        <Route path="/books/add" Component={() => <AddBook />} />
        <Route path="/books/edit/:id" Component={() => <EditBook />} />
        <Route
          path="/books/issue/:bookId/:userId"
          Component={() => <IssueBook />}
        />

        <Route path="/account" Component={() => <Account />} />
      </Routes>
    </Router>
  );
}

export default App;
