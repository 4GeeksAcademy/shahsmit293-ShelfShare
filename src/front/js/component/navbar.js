import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div className="logo-container">
          <Link to="/">
            <img
              src={`https://icon2.cleanpng.com/20180318/tlq/kisspng-bookcase-cartoon-books-on-a-bookshelf-5aae55a61086b3.2887318115213746300677.jpg`}
              alt="Logo"
              className="logo-image"
            />
          </Link>
          <p className="logo-text">ShelfShare</p>
          <p className="About-text">
            <b>About Us</b>
          </p>
        </div>
        <div
          className="ml-auto"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => {
              navigate("/login");
            }}
          >
            <b>Login</b>
          </button>
          <button type="button" className="btn btn-outline-dark">
            <b>Signup</b>
          </button>
        </div>
      </div>
    </nav>
  );
};
