import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Bookcard } from "../component/bookcard";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export const Home = () => {
  let { state } = useLocation();
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [search, setSearch] = useState(state?.search || "");
  const [select, setSelect] = useState("");

  useEffect(() => {
    if (store.activeuser) {
      actions.getfavoritebook(store.activeuser)
    }
  }, [store.activeuser])

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in kilometers

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
  };



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
    } else if (select === "old to new") {
      return store.allbooks;
    } else if (select === "new to old") {
      let reversedBooks = [...store.reverseallbook].reverse();
      return reversedBooks;;
    } else if (select === "Only For Exchange") {
      return store.onlyexchangebooks;
    } else if (select === "Only For Donate") {
      return store.onlydonatebooks;
    } else if (select === "Both Exchange & Donate") {
      return store.exchangeanddonatebooks;
    }
    else if (select === "within 30 Kilometers") {
      const data = (store.allbooks && store.allbooks.filter((book) => {
        if (calculateDistance(parseFloat(store.user.lat), parseFloat(store.user.lng), parseFloat(book.user.lat), parseFloat(book.user.lng)) <= 30) {
          return true
        } else return false
      }))
      return data
    } else if (select === "My Favorites") {
      let filteredData = store.filterfavorite.filter(item => store.favoritebookid.includes(item.id));
      return filteredData
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
    } else if (e.target.value === "old to new") {
      setSelect("old to new");
    } else if (e.target.value === "new to old") {
      setSelect("new to old");
    } else if (e.target.value === "Only For Exchange") {
      setSelect("Only For Exchange");
    } else if (e.target.value === "Only For Donate") {
      setSelect("Only For Donate");
    } else if (e.target.value === "Both Exchange & Donate") {
      setSelect("Both Exchange & Donate");
    } else if (e.target.value === "within 30 Kilometers") {
      setSelect("within 30 Kilometers")
    } else if (e.target.value === "My Favorites") {
      setSelect("My Favorites")
    } else {
      setSelect("");
    }
  };
  return (
    <div className="background text-center mt-5 ms-2 me-2 px-3">
      <div className="add books mt-4 mb-4">
        <button type="button" className="btn btn-success w-25"
          onClick={() => {
            {
              store.accessToken
                ? navigate(`/profile/${store.activeuser}`)
                : navigate("/login");
            }
          }}
        >
          Upload Book Here
        </button>
      </div>
      <div className="find" style={{ display: "flex", padding: "px" }}>
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

        <div className="input-group" style={{ justifyContent: "end" }}>
          <select
            className="custom-select"
            id="inputGroupSelect04"
            onChange={sorted}
          >
            <option value="">Sort By</option>
            <option value="Ascending">Ascending(A-Z)</option>
            <option value="Descending">Descending(Z-A)</option>
            <option value="Year Ascending">Year (Ascending)</option>
            <option value="Year Descending">Year (Descending)</option>
            <option value="old to new">Oldest-Newest</option>
            <option value="new to old">Newest-Oldest</option>
            <option value="Only For Exchange">Only For Exchange</option>
            <option value="Only For Donate">Only For Donate</option>
            <option value="Both Exchange & Donate">Both Exchange & Donate</option>
            <option value="within 30 Kilometers">Within 30 Kilometers</option>
            <option value="My Favorites">My Favorites</option>
          </select>
        </div>
      </div>
      <div className="row gy-3 mt-4 p-3">
        {dataType().length > 0 ? (
          dataType()
            .filter((item) => {
              if (!item) return false;
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
                  image={element.image}
                  location={element.user.location}
                  bookid={element.id}
                  yourbookid={element.user_id}
                  exchange={element.exchange}
                  donate={element.donate}
                />
              );
            })
        ) : (
          <p>No books to display.</p>
        )}
      </div>
    </div>
  );
};
