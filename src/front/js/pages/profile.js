import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate, useParams } from "react-router-dom";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { userid } = useParams();

  useEffect(() => {
    actions.singleUser(userid);
  }, [userid]);

  useEffect(() => {
    if (!store.singleUser) return;
    actions.matchingWishlistBook();
  }, [store.singleUser]);

  useEffect(() => {
    console.log(store.matchingBooks);
  }, [store.matchingBooks]);

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-evenly mt-4">
        <div className="col-4 d-flex justify-content-center align-items-center">
          <h3>My available books</h3>
        </div>
        <div className="col-4 d-flex justify-content-center align-items center">
          <h3>My Wishlist</h3>
        </div>
      </div>

      <div className="row d-flex justify-content-evenly">
        <div className="col-4 border border-3 rounded d-flex flex-column p-4 m-4">
          <ul className="list-group">
            {store.singleUser?.books.map((book, index) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={book.id}
                >
                  {book.name} by {book.author}
                  <button
                    className="btn btn-danger btn-sm mx-auto"
                    onClick={() => {
                      actions.deleteBook(book.id);
                    }}
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-auto"
                    onClick={() => {
                      navigate(`/showbook/${book.id}`);
                    }}
                  >
                    View
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            className="btn btn-success btn-sm mx-auto"
            onClick={() => {
              navigate("/addbook");
            }}
          >
            Add a book
          </button>
        </div>
        <div className="col-4 border border-3 rounded d-flex flex-column p-4 m-4">
          <ul className="list-group">
            {store.singleUser?.wishlist_books.map((book, index) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={book.id}
                >
                  {book.name} by {book.author}
                  <button
                    className="btn btn-danger btn-xs mx-auto"
                    onClick={() => {
                      actions.deleteWishlistBook(book.id);
                    }}
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                  {store.matchingBooks?.find(
                    (book2) =>
                      book.name === book2.name && book.author === book2.author
                  ) ? (
                    <button
                      onClick={() => {
                        navigate("/", { state: { search: book.name } });
                      }}
                    >
                      matched
                    </button>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <button
            className="btn btn-success btn-sm mx-auto"
            onClick={() => {
              navigate("/addwishlistbook");
            }}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
      <div className="row m-2 mt-4">
        <div className="col-12 d-flex justify-content-center">
          <h3> My Information</h3>
        </div>
      </div>
      <div className="row mb-2 d-flex justify-content-center">
        <div className="col-4 d-flex align-items-center flex-column border border-3 p-2">
          <p>
            Name: {store.singleUser?.first_name} {store.singleUser?.last_name}
          </p>
          <p>Age: {store.singleUser?.age}</p>
          <p>Address: {store.singleUser?.location}</p>
        </div>
      </div>
    </div>
  );
};
