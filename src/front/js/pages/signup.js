import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/signup.css";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  console.log("STORE***", store.user);

  return (
    <form onSubmit={handleSubmit}>
      <label>First Name:</label>
      <input
        type="text"
        name="firstName"
        onChange={handleInputChange}
        required
      />
      <br />
      <br />

      <label>Last Name:</label>
      <input
        type="text"
        name="lastName"
        onChange={handleInputChange}
        required
      />
      <br />
      <br />

      <label>Age:</label>
      <input type="number" name="age" onChange={handleInputChange} required />
      <br />
      <br />

      <label>Location:</label>
      <input
        type="text"
        name="location"
        onChange={handleInputChange}
        required
      />
      <br />
      <br />

      <label>Email ID:</label>
      <input type="email" name="email" onChange={handleInputChange} required />
      <br />
      <br />

      <label>Password:</label>
      <input
        type="password"
        name="password"
        onChange={handleInputChange}
        required
      />
      <br />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};
