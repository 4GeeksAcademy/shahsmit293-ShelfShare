import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import { useNavigate } from "react-router-dom";

export const Addwishlistbookbook = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");

  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <form className="form">
        <label>Book Name:</label>
        <input
          className="input"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Author Name:</label>
        <input
          className="input"
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <br />
        <br />

        <button
          type="button"
          onClick={(e) => {
            actions.addWishlistBook(name, author, store.activeuser).then(() => {
              navigate(`/profile/${store.activeuser}`);
            });
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
