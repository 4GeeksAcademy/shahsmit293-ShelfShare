import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Inbox = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { inboxid } = useParams();
  useEffect(() => {
    store.contacted = [];
    actions.inboxchats(+inboxid);
  }, []);
  return (
    <div className="allchats" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2 style={{ color: "black", textAlign: "center", "margin": "2.5%" }}>Messages</h2>
      {store.contacted
        .filter(
          (value, index, self) =>
            self.findIndex(
              (item) =>
                item.contactuserid === value.contactuserid &&
                item.username === value.username
            ) === index
        )
        .map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                if (store.accessToken) {
                  navigate(`/chat/${inboxid}/${item.contactuserid}`);
                }
              }}
              className="bookcard btn-success"
              style={{
                width: "200px",
                margin: "2.5%",
                padding: "10px",
                backgroundColor: "#a88734 #9c7e31 #846a29",
                border: "none",
                color: "white",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "24px",
                transitionDuration: "0.4s",
                cursor: "pointer"
              }}
            >
              {item.username}
            </button>
          );
        })}
    </div>
  );
};
