import React from "react";
import "./Message.scss";
import avatar from "../../assets/avatar.jpg";
import { Link } from "react-router-dom";
const Message = (obj) => {

  
  console.log(obj);
  return (
    <div className="message">
      <div className="message__container">
        <Link to={`/profile/${obj.userId}`}>
          <img
            src={`http://localhost:5000${obj.avatar}`}
            alt=""
            className="message__avatar"
          />
        </Link>
        <div className="message__content">
          <div className="message__content-user">
            <div className="message__content-name">{obj.username}</div>
            <div className="message__content-username">@{obj.nickname}</div>
          </div>
          <div className="message__content-text">{obj.message}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
