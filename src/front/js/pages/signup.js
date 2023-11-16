import React, { useContext, useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import { useNavigate } from "react-router-dom";
import LocationSearchInput from "../component/locationSearchInput";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // const backgroundStyle = {
  //   backgroundImage: `url(https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA1L2pvYjE4MDgtcmVtaXgtMDRhLWMuanBn.jpg)`,
  //   backgroundSize: "contain",
  //   backgroundPosition: "center",
  //   minHeight: "100vh", // Set the minimum height to cover the entire viewport
  // };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src="https://m.media-amazon.com/images/I/61I-fP2T5gL._AC_SL1100_.jpg" alt="Background" className="background-image" />
        </div>
        <div className="col-md-6">
          <h2 className="text-center">Sign Up</h2>
          <form className="form mt-4">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                className="form-control"
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                className="form-control"
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="">
              <label htmlFor="age" className="form-label">
                Age:
              </label>
              <input
                className="form-control"
                type="number"
                id="age"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <br />
            <br />

            <label>Address:</label>
            <LocationSearchInput
              setLocation={setLocation}
              setCoordinates={setCoordinates}
              location={location}
            />

            <br />
            <br />

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email ID:
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              className="btn btn-success"
              style={{ marginBottom: "175px" }}
              onClick={(e) => {
                actions
                  .signup(email, password, age, location, firstName, lastName, coordinates)
                  .then(() => navigate("/"));
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
