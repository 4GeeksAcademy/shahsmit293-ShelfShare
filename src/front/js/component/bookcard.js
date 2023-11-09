import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { Context } from "../store/appContext";

export const Bookcard = (props) => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const isUserBook = store.activeuser === props.yourbookid;
  return (
    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
      <div className="card border border-3" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={props.image}
          alt="Card image cap"
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
        />
        <div className="card-body">
          <h5 className="card-title">BookName:{props.bookname}</h5>
          <p className="card-text">Author:{props.author}</p>
          <p className="card-text">Year:{props.year}</p>
          <p className="card-text">Category:{props.category}</p>
          <p className="card-text">Location:{props.location}</p>
          {store.activeuser ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate(`/showbook/${props.bookid}`);
              }}
            >
              {isUserBook ? "Your Book" : "View"}
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate(`/showbook/${props.bookid}`);
              }}
            >
              View
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Bookcard.propTypes = {
  bookname: propTypes.string,
  author: propTypes.string,
  year: propTypes.number,
  category: propTypes.string,
  image: propTypes.string,
  location: propTypes.string,
  bookid: propTypes.number,
  yourbookid: propTypes.number,
};
