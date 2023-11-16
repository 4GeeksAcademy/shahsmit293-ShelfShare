import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
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
    // console.log(store.matchingBooks);
  }, [store.matchingBooks]);

  return (
    <div className="background container-fluid">
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
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={book.id}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    <span style={{ fontSize: '1em' }}>Book Name: <span style={{ color: 'blue', textTransform: 'uppercase' }}>{book.name}</span></span>
                    <span style={{ fontSize: '1em' }}>Author Name: <span style={{ color: 'red', textTransform: 'uppercase' }}>{book.author}</span></span>
                  </div>

                  <div style={{ gap: '10px', display: 'flex', alignItems: 'center' }}>
                    <button
                      className="btn btn-danger btn-sm mx-auto"
                      onClick={() => {
                        actions.deleteBook(book.id);
                      }}
                      style={{ padding: '5px 10px' }}
                    >
                      <i class="fa-solid fa-trash-can" style={{ verticalAlign: 'middle' }}></i>
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-auto"
                      onClick={() => {
                        navigate(`/showbook/${book.id}`);
                      }}
                      style={{ padding: '5px 10px' }}
                    >
                      <span style={{ verticalAlign: 'middle' }}>View</span>
                    </button>
                    <button
                      className="btn btn-info btn-sm mx-auto"
                      onClick={() => {
                        navigate(`/editbook/${book.id}`);
                      }}
                      style={{ padding: '5px 10px' }}
                    >
                      <i className="fas fa-edit" style={{ verticalAlign: 'middle' }}></i>
                    </button>
                  </div>
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
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={book.id}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    <span style={{ fontSize: '1em' }}>Book Name: <span style={{ color: 'blue', textTransform: 'uppercase' }}>{book.name}</span></span>
                    <span style={{ fontSize: '1em' }}>Author Name: <span style={{ color: 'red', textTransform: 'uppercase' }}>{book.author}</span></span>
                  </div>

                  <div style={{ gap: '10px', display: 'flex', alignItems: 'center' }}>
                    <button
                      className="btn btn-danger btn-sm mx-auto"
                      onClick={() => {
                        actions.deleteWishlistBook(book.id);
                      }}
                      style={{ padding: '5px 10px' }}
                    >
                      <i className="fa-solid fa-trash-can" style={{ verticalAlign: 'middle' }}></i>
                    </button>
                    {store.matchingBooks?.find(
                      (book2) =>
                        book.name === book2.name && book.author === book2.author
                    ) ? (
                      <button
                        className="btn btn-info btn-sm mx-auto"
                        onClick={() => {
                          navigate("/", { state: { search: book.name } });
                        }}
                        style={{ padding: '5px 10px' }}
                      >
                        <span style={{ verticalAlign: 'middle' }}>Matched</span>
                      </button>
                    ) : null}
                  </div>
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
