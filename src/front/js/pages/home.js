import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Bookcard } from "../component/bookcard";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");

  function dataType() {
    if (select === "Ascending") {
      store.ascendingbooks.sort((a, b) => a.name.localeCompare(b.name));
      return store.ascendingbooks;
    } else if (select === "Descending") {
      store.descendingbooks.sort((a, b) => b.name.localeCompare(a.name));
      return store.descendingbooks;
    } else if (select === "Year Ascending") {
      store.years.sort((a, b) => a.year - b.year);
      return store.years;
    } else if (select === "Year Descending") {
      store.years.sort((a, b) => b.year - a.year);
      return store.years;
    } else if (select === "") {
      return store.allbooks;
    }
  }
  const sorted = (e) => {
    if (e.target.value === "Ascending") {
      setSelect("Ascending");
    } else if (e.target.value === "Descending") {
      setSelect("Descending");
    } else if (e.target.value === "Year Ascending") {
      setSelect("Year Ascending");
    } else if (e.target.value === "Year Descending") {
      setSelect("Year Descending");
    } else {
      setSelect("");
    }
  };
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

      <div className="input-group" style={{ justifyContent: "center" }}>
        <select
          className="custom-select"
          id="inputGroupSelect04"
          onChange={sorted}
        >
          <option value="">Sort By</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
          <option value="Year Ascending">Year (Ascending)</option>
          <option value="Year Descending">Year (Descending)</option>
        </select>
      </div>
      <div className="row gy-3">
        {dataType()
          .filter((item) => {
            const itemName = item.name.toLowerCase();
            const term = search.toLowerCase();
            return itemName.startsWith(term);
          })
          .map((element, index) => {
            return (
              <Bookcard
                key={element.id}
                bookname={element.name}
                author={element.author}
                year={element.year}
                category={element.category}
                location={element.user.location}
                bookid={element.id}
              />
            );
          })}
      </div>
    </div>
  );
};
