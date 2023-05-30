import "./components.css";
import { MdAccountBox } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

const Header = ({ logout }) => {
  const navigate = useNavigate();
  const token = useState(Cookies.get("jwt"));
  const logOut = () => {
    Cookies.remove("jwt");
    navigate("/");
  };

  return (
    <div className="header">
      <h1 className="header-h1" onClick={() => navigate("/books")}>
        Library Management System
      </h1>
      <div className="header-icons">
        {logout ? (
          <CgLogOut
            style={{ cursor: "pointer", fontSize: 30, marginLeft: 10 }}
            onClick={logOut}
          />
        ) : token ? (
          <a href="/account">
            <MdAccountBox
              style={{
                fontSize: 50,
                color: "white",
                marginLeft: 10,
              }}
            />
          </a>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Header;

