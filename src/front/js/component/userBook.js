import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const UserBook = (book) => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    return (
        <div className="d-flex flex-row p-2 border border-black rounded-5 mb-2" style={{background: "#d9d9d9"}}>
            <div className="d-flex flex-column w-50 align-items-center">
                <p className="fs-3">{book.name.substring(0, 14)}{book.name.length > 14 && '...'}</p>
                <p className="d-flex justify-content-center">By: {book.author}</p>
            </div>
            <div className="d-flex w-50 justify-content-between">
                <button
                    className="btn btn-danger btn-sm mx-auto w-25 h-50"
                    onClick={() => {
                        actions.deleteBook(book.id);
                    }}
                    style={{ padding: '5px 10px' }}
                >
                    <i className="fa-solid fa-trash-can" style={{ verticalAlign: 'middle' }}></i>
                </button>
                <button
                    className="btn btn-danger btn-sm mx-auto w-25 h-50"
                    onClick={() => {
                        navigate(`/showbook/${book.id}`);
                    }}
                    style={{ padding: '5px 10px' }}
                >
                    <span className="d-flex justify-content-center">View</span>
                </button>
                <button
                    className="btn btn-info btn-sm mx-auto w-25 h-50"
                    onClick={() => {
                        navigate(`/editbook/${book.id}`);
                    }}
                    style={{ padding: '5px 10px' }}
                >
                    <i className="fas fa-edit" style={{ verticalAlign: 'middle' }}></i>
                </button>
            </div>
        </div>
    );
};