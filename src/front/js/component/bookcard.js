import React from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

export const Bookcard = (props) => {
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
          <h5 className="card-title">BookName:{props.bookname}</h5>
          <p className="card-text">Author:{props.author}</p>
          <p className="card-text">Year:{props.year}</p>
          <p className="card-text">Category:{props.category}</p>
          <p className="card-text">Location:{props.location}</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(`/showbook/${props.bookid}`);
            }}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

Bookcard.propTypes = {
  bookname: propTypes.string,
  author: propTypes.string,
  year: propTypes.string,
  category: propTypes.string,
  location: propTypes.string,
  bookid: propTypes.string,
};
