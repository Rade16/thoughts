import React from "react";
import "./Message.scss";
import avatar from "../../assets/avatar.jpg";
const Message = () => {
  return (
    <div className="message">
      <div className="message__container">
        <img src={avatar} alt="" className="message__avatar" />
        <div className="message__content">
          <div className="message__content-user">
            <div className="message__content-name">Роберт</div>
            <div className="message__content-username">@kayaflower</div>
          </div>
          <div className="message__content-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quod
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
