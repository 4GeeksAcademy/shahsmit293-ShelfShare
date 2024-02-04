import React, { useState} from "react";
import "../../styles/login.css";
import axios from 'axios';

const forgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleForgotPassword = () => {
    axios
      .post(`${process.env.BACKEND_URL}api/forgot-password`, { email })
      .then((response) => {
        alert('A password reset email with instructions has been sent to your email address.');
        onClose();
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setError(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setError('No response received from server.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          setError(error.message);
        }
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
            className="btn btn-secondary"
            type="button"
            onClick={handleForgotPassword}>Send Email</button>
        </div>
      </div>
    </div>
  );
};

export default forgotPassword;
