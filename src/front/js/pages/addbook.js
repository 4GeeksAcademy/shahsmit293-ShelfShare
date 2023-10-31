import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import { useNavigate } from "react-router-dom";

export const Addbook = () => {
  const [name, setname] = useState("");
  const [author, setauthor] = useState("");
  const [year, setYear] = useState("");
  const [category, setcategory] = useState("");
  const [quantity, setquantity] = useState("");
  const [image, setImage] = useState("");

  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <form className="form">
        <label>Book Name:</label>
        <input
          class="input"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Author Name:</label>
        <input
          class="input"
          type="text"
          name="author"
          value={author}
          onChange={(e) => setauthor(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Year:</label>
        <input
          type="number"
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <br />
        <br />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={category}
          onChange={(e) => setcategory(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Quantity:</label>
        <input
          class="input"
          type="quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => setquantity(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Image:</label>
        <input
          class="input"
          type="text"
          name="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <br />
        <br />

        <button
          type="button"
          onClick={(e) => {
            actions
              .addbook(
                name,
                author,
                category,
                quantity,
                image,
                year,
                store.activeuser
              )
              .then(() => navigate(`/profile/${store.activeuser}`));
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
