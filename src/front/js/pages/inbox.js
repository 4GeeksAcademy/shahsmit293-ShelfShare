import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
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
    <div
      className="allchats"
      style={{ display: "flex", flexDirection: "column" }}
    >
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
            >
              connect to user: {item.username}
            </button>
          );
        })}
    </div>
  );
};
