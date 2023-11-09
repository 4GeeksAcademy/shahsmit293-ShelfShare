import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const forgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    axios
      .post('https://zany-meme-5ww5xwq55prh4v6r-3001.app.github.dev/api/forgot-password', { email })
      .then((response) => {
        alert('A password reset email with instructions has been sent to your email address.');
        onClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className=" justify-content-center align-items-center vh-100">
      <div className="text-center login">
        <div>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Enter your email for password recovery"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <button
            class="btn btn-success"
            type="button"
            onClick={handleForgotPassword}>Send Email</button>
        </div>
      </div>
    </div>
  );
};

export default forgotPassword;
