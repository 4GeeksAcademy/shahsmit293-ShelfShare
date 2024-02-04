import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/showbook.css";

export const Showbook = () => {
  const { store, actions } = useContext(Context);
  const { bookid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    actions.singlebook(bookid);
    console.log(store.singlebook);
  }, []);
  return (
    <div className="main d-flex justify-content-center">
      <div
        className="d-flex flex-row align-items-center justif-content-center w-50 info-container"
      >
        <div className="w-50 d-flex align-items-center justify-content-end">
          <img
            className="border border-2 border-dark shadow-md rounded"
            src={store.singlebook.image}
            alt="Card image cap"
            style={{ width: "220px", height: "400px", margin: "25px" }}
          />
        </div>
        <div className="text">
          <div className="bookname"><h1>{store.singlebook.name}</h1></div>
          <div className="author"><h3>By {store.singlebook.author}</h3></div>
          <div className="description"><h5>{store.singlebook.description}</h5></div>
          <div className="year"><h6>Year: {store.singlebook.year}</h6></div>
          <div className="exchange"><h6>Exchange: {store.singlebook.exchange}</h6></div>
          <div className="donate"><h6>Donate: {store.singlebook.donate}</h6></div>
          {store.activeuser === store.singlebook.user_id ? null : (
            <button
              type="button"
              className="btn btn-success w-100"
              onClick={() => {
                if (store.activeuser === store.singlebook.user_id) {
                  alert("This is your book");
                  return;
                }
                store.accessToken
                  ? navigate(
                    `/chat/${store.activeuser}/${store.singlebook.user_id}`
                  )
                  : navigate("/login");
              }}
            >
              Contact owner
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
