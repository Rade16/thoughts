import React from "react";
import "./MessageInput.scss";
import avatar from "../../assets/avatar.jpg";
const MessageInput = () => {
  return (
    <div className="messageInput">
      <div className="messageInput__container">
        <img src={avatar} alt="" className="messageInput__avatar" />
        <input className="messageInput__input" placeholder="Что нового?" />
      </div>
    </div>
  );
};

export default MessageInput;
