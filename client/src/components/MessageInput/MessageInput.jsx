import React, { useState } from "react";
import "./MessageInput.scss";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import avatar from "../../assets/avatar.jpg";
import send from "../../assets/send.svg";

const MessageInput = ({ setMessages }) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Вы не авторизованы");
        return;
      }
      const response = await axios.get(
        `http://localhost:5000/api/posts/my-posts/${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Ошибка при получении сообщений:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/create/${user.id}`,
        {
          message,
        },

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("");
      await fetchMessages();
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка при создании рецепта:", error);
    }
  };
  return (
    <div className="messageInput">
      <div className="messageInput__container">
        <form action="" onSubmit={handleSubmit} className="messageInput__form">
          <img
            src={`http://localhost:5000${user.avatar}`}
            alt=""
            className="messageInput__avatar"
          />
          <input
            className="messageInput__input"
            placeholder="Что нового?"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="messageInput__btn" type="submit">
            <img src={send} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
