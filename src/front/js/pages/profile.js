import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserBook } from "../component/userBook";
import { WishlistBook } from "../component/wishlistBook";

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
    <div className="background container-fluid">
      <div className="row d-flex justify-content-evenly mt-4 pt-4">
        <div className="col-4 d-flex justify-content-center align-items-center">
          <h3>My available books</h3>
        </div>
        <div className="col-4 d-flex justify-content-center align-items center">
          <h3 className="">My Wishlist</h3>
        </div>
      </div>

      <div className="row d-flex justify-content-evenly">
        <div className="col-4 border border-3 rounded d-flex flex-column p-4 m-4">
          <ul className="list-group">
            {store.singleUser?.books.map((book, index) => {
              return (
                <UserBook 
                key={book.id} 
                name={book.name} 
                author={book.author}
                id={book.id}/>
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
                <WishlistBook 
                name={book.name}
                author={book.author}
                id={book.id}
                />
              )
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
      </div>
    </div>
  );
};
