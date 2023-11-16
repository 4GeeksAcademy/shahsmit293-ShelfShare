import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { Context } from "../store/appContext";
import { Messagecard } from "../component/messagebar";
import "../../styles/chat.css";

export const Chat = () => {
  const { store, actions } = useContext(Context);
  const { senderid, receiverid } = useParams();
  const [value, setValue] = useState("");

  useEffect(() => {
    actions.getchats(+senderid, +receiverid);
    console.log(store.allchats);
  }, []);
  return (
    <div className="main">

      <div className="messages">
        {store.allchats?.map((chat, index) =>
          chat.sender_id === parseInt(senderid) ? (
            <div key={index} className="sender">
              <p style={{ marginBottom: "0.5em" }}>{chat.message}</p>
              <p style={{ fontSize: "0.6em", color: "#808080", textAlign: "right" }}>{chat.current_date} {chat.current_time}</p>
            </div>
          ) : (
            <div key={index} className="receiver">
              <p style={{ marginBottom: "0.5em" }}>{chat.message}</p>
              <p style={{ fontSize: "0.6em", color: "#9B9B9B", textAlign: "right" }}>{chat.current_date} {chat.current_time}</p>
            </div>
          )
        )}
      </div>

      <div className="input">
        <input
          type="text"
          id="fname"
          name="fname"
          placeholder="Enter chat here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={() => {
            actions.addchats(+senderid, +receiverid, value);
            // Clear the input field
            setValue("");
            // Reload the page
            window.location.reload();
          }}
        >
          Send
        </button>
      </div>

    </div>


  );
};
