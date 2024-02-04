import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.updateStoreFromStorage();
  }, [store.accessToken]);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div className="logo-container">
          <Link to="/">
            <img
              src="https://icon2.cleanpng.com/20180318/tlq/kisspng-bookcase-cartoon-books-on-a-bookshelf-5aae55a61086b3.2887318115213746300677.jpg"
              alt="Logo"
              className="logo-image"
            />
          </Link>
          <p className="logo-text">ShelfShare</p>
        </div>

        <div className="d-flex flex-direction-row justify-content-center align-items-center">
          {store.accessToken ? (
            <div className="d-flex align-items-center">
              <button
                type="button"
                className="btn btn-outline-dark text-center d-flex justify-content-between ps-3 pe-3 pt-1"
                style={{ fontSize: "20px" }}
                onClick={() => {
                  actions.allbooksdata();
                  navigate("/");
                }}
              >
                <i className="fa-solid fa-book me-2 d-flex align-items-center justify-content-center pt-2"></i>
                <p className="pt-1">Browse Books</p>
              </button>
              <div className="dropdown m-4">
                <button
                  className="btn p-2"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i
                    className="fa-solid fa-bars"
                    style={{ fontSize: "50px" }}
                  ></i>
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate(`/profile/${store.activeuser}`);
                      }}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate(`/inbox/${store.activeuser}`);
                      }}
                    >
                      Inbox
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={actions.handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="ml-auto">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => navigate("/login")}
              >
                <b>Login</b>
              </button>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => navigate("/signup")}
              >
                <b>Signup</b>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
