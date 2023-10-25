import React from "react";
import { useNavigate, useParams } from "react-router-dom";
export const Showbook = () => {
  const { bookid } = useParams();
  const navigate = useNavigate();
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
            src="https://placehold.co/600x400"
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
          <h1>Book Name</h1>
          <h3 style={{ overflowWrap: "break-word" }}>Description</h3>
        </div>
      </div>
      <button
        type="button"
        class="btn btn-success"
        onClick={() => {
          navigate("/login");
        }}
      >
        Contact me
      </button>
      <hr style={{ color: "black" }}></hr>
      <div
        className="footer"
        style={{
          display: "flex",
          margin: "25px",
          padding: "15px",
          justifyContent: "space-evenly",
          color: "red",
        }}
      >
        <div>
          <h3>Name:</h3>
          <h5>Name</h5>
        </div>
        <div>
          <h3>Author:</h3>
          <h5>Author</h5>
        </div>
        <div>
          <h3>Year</h3>
          <h5>year</h5>
        </div>
        <div>
          <h3>Exchange</h3>
          <h5>yes</h5>
        </div>
        <div>
          <h3>Donate</h3>
          <h5>yes</h5>
        </div>
      </div>
    </div>
  );
};
