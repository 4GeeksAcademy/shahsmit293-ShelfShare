import React from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

export const Messagecard = (props) => {
  return (
    <div className="main">
      <p>{props.message}</p>
    </div>
  );
};

Messagecard.propTypes = {
  message: propTypes.string,
};
