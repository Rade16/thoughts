import React, { useState } from "react";
import "./MessageInput.scss";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import avatar from "../../assets/avatar.jpg";
import send from "../../assets/send.svg";
const MessageInput = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/create/${user.id}`,
        {
          description,
          username: user.username,
          nickname: user.nickname,
          
        },

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка при создании рецепта:", error);
    }
  };
  return (
    <div className="messageInput">
      <div className="messageInput__container">
        <form action="" onSubmit={handleSubmit} className="messageInput__form">
        <img src={avatar} alt="" className="messageInput__avatar" />
        <input className="messageInput__input" placeholder="Что нового?" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <button className="messageInput__btn" type="submit"><img src={send} alt="" /></button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
