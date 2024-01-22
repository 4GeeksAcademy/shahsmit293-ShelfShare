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
    <div className="main">
      <div
        className="body"
        style={{
          display: "flex",
          flexDirection: "row",
          height: "600px",
        }}
      >
        <div className="photos">
          <img
            className="main-image"
            src={store.singlebook.image}
            alt="Card image cap"
            style={{ width: "600px", height: "400px", margin: "25px" }}
          />
        </div>
        <div className="text">
          <div className="bookname"><h1>{store.singlebook.name}</h1></div>
          <div className="author"><h3>By {store.singlebook.author}</h3></div>
          <div className="description"><h5>{store.singlebook.description}</h5></div>
          <div className="year"><h6>Year: {store.singlebook.year}</h6></div>
          <div className="exchange"><h6>Exchange: {store.singlebook.exchange}</h6></div>
          <div className="donate"><h6>Donate: {store.singlebook.donate}</h6></div>
        </div>

      </div>
      <div className="contact button">
        {store.activeuser === store.singlebook.user_id ? null : (
          <button
            type="button"
            className="btn btn-success w-25"
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
            Contact me
          </button>
        )}</div>

    </div>
  );
};
