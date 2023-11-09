import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/addbook.css";
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

  const backgroundStyle = {
    backgroundImage: `url(https://images.ra
    wpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA1L2pvYjE4MDgtcmVtaXgtMDRhLWMuanBn.jpg)`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    minHeight: "100vh", // Set the minimum height to cover the entire viewport
  };

  return (
    <div className="background container mt-4 rounded" style={{ ...backgroundStyle }}>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form className="form mt-4">
            <div className="mb-3">
              <label htmlFor="nameset" className="form-label">
                Book Name: </label>
              <input className="form-control"
                type="text"
                id="setname"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              ></input>
            </div>

            <div className="mb-3">
              <label htmlFor="authorset" className="form-label">
                Author Name:
              </label>
              <input
                className="form-control"
                type="text"
                id="author"
                name="author"
                value={author}
                onChange={(e) => setauthor(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Yearset" className="form-label">
                Year:
              </label>
              <input
                className="form-control"
                type="number"
                id="year"
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="categoryset" className="form-label">
                Category:
              </label>
              <input
                className="form-control"
                type="text"
                id="category"
                name="category"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="quantityset" className="form-label">
                Quantity:
              </label>
              <input
                className="form-control"
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setquantity(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Image" className="form-label">
                Image:
              </label>
              <input
                className="form-control"
                type="text"
                id="image"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}

              />
            </div>

            <div className="d-flex justify-content-center">
              <button type="button" class="btn btn-success"
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
                    .then(() => {
                      navigate(`/profile/${store.activeuser}`);
                    });
                }}
              >
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
