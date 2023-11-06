import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { Context } from "../store/appContext";
import { Messagecard } from "../component/messagebar";

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
      <div className="input">
        <>
          <label htmlFor="fname">enter chat here:</label>
          <input
            type="text"
            id="fname"
            name="fname"
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
          <br />
          <br />
        </>
      </div>
      <div className="messages">
        {store.allchats?.map((chat, index) =>
          chat.sender_id === parseInt(senderid) ? (
            <div key={index} style={{ color: "red" }}>
              <p>
                {chat.message}.........{chat.current_date}.......
                {chat.current_time}
              </p>
            </div>
          ) : (
            <div key={index} style={{ color: "yellow" }}>
              <p>{chat.message}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
