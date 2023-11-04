import React, { useContext, useState,useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const forgotPasswordForm = ({ onClose }) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    axios
      .post('https://zany-meme-5ww5xwq55prh4v6r-3001.app.github.dev/api/forgot-password', {email})
      .then((response) => {
        alert('A password reset email with instructions has been sent to your email address.');
        onClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="forgot-password-form">
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button onClick={handleForgotPassword}>Send</button>
    </div>
  );
};

export default forgotPasswordForm;
