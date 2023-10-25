import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Bookcard } from "../component/bookcard";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <div className="add books">
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Upload Book Here.......
        </button>
      </div>
      <form className="form-inline">
        <div
          className="search"
          style={{ display: "inline-flex", justifyItems: "center" }}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search Books Here........"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>

      <div className="input-group" style={{ justifyContent: "center" }}>
        <select className="custom-select" id="inputGroupSelect04">
          <option selected="">Filter</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
        </select>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">
            Submit
          </button>
        </div>
      </div>
      <div className="row gy-3">
        <Bookcard />
        <Bookcard />
        <Bookcard />
        <Bookcard />
        <Bookcard />
      </div>
    </div>
  );
};
