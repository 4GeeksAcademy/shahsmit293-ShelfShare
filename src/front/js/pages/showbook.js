import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { Context } from "../store/appContext";

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
          color: "red",
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
        <div
          className="text"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            margin: "25px",
          }}
        >
          <div className="bookname" style={{ display: "inline-block" }}><h1>Book Name:</h1><h5>{store.singlebook.name}</h5></div>
          <div className="description"><h3 style={{ overflowWrap: "break-word" }}>Description: </h3><h5>{store.singlebook.description}</h5></div>

          <div className="author"><h3>Author: </h3><h5>{store.singlebook.author}</h5></div>


          <h3>Year: <h5>{store.singlebook.year}</h5></h3>
          <h3>Exchange: <h5>{store.singlebook.exchange}</h5></h3>
          <h3>Donate:  <h5>{store.singlebook.donate}</h5></h3>
        </div>
      </div>
      {store.activeuser === store.singlebook.user_id ? null : (
        <button
          type="button"
          className="btn btn-success"
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
      )}

      <hr style={{ color: "black" }}></hr>
      <div
        className="footer"
        style={{
          display: "flex",
          margin: "25px",
          padding: "15px",
          justifyContent: "space-evenly",
          color: "red",
        }}>

      </div>
    </div>
  );
};
