import React from "react";
import "./Message.scss";
import avatar from "../../assets/avatar.jpg";
const Message = (obj) => {
  return (
    <div className="message">
      <div className="message__container">
        <img src={avatar} alt="" className="message__avatar" />
        <div className="message__content">
          <div className="message__content-user">
            <div className="message__content-name">{obj.username}</div>
            <div className="message__content-username">@{obj.nickname}</div>
          </div>
          <div className="message__content-text">
            {obj.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
