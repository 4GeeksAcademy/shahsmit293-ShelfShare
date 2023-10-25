import React from "react";
import { useNavigate } from "react-router-dom";
export const Bookcard = () => {
  const navigate = useNavigate();
  return (
    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
      <div className="card" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src="https://placehold.co/600x400"
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">BookName:</h5>
          <p className="card-text">Author:</p>
          <p className="card-text">Year:</p>
          <p className="card-text">Category:</p>
          <p className="card-text">Location:</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/showbook/:bookid") || navigate("/showbook");
            }}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};
