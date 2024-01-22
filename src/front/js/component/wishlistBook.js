import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const WishlistBook = (book) => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (!store.singleUser) return;
        actions.matchingWishlistBook();
      }, [store.singleUser]);
    
      useEffect(() => {
        console.log(store.matchingBooks);
      }, [store.matchingBooks]);
    

    return (
        <div className="d-flex flex-row p-2 border border-black rounded-5 align-items-center justify-content-center mb-2" style={{ background: "#d9d9d9" }}>
            <div className="d-flex flex-column w-50 align-items-center">
                <p className="fs-3">{book.name}</p>
                <p>Author: {book.author}</p>
            </div>
            <div className="d-flex w-50 justify-content-between">
                <button
                    className="btn btn-danger btn-sm mx-auto w-25 h-50"
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
        </div>
    );
};