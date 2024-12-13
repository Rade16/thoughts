import React, { useState, useEffect } from "react";
import "./Feed.scss";
import Navigation from "../../components/Navigation/Navigation";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Message from "../../components/Message/Message";
import MessageInput from "../../components/MessageInput/MessageInput";
import Recommendations from "../../components/Recommendations/Recommendations";
import axios from "axios";
const Feed = () => {
  const [messages, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Вы не авторизованы");
        return;
      }
      const response = await axios.get(
        `http://localhost:5000/api/posts/all-posts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRecipes(response.data);
    };
    fetchRecipes();
  }, [messages]);
  return (
    <div className="feed">
      <Navigation />
      <div className="feed__container">
        <div className=""></div>
        <div className="feed__messages">
          <MessageInput />
          {messages
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((message) => (
              <Message
                key={message.id}
                userId={message.user_id}
                avatar={message.user.avatar}
                username={message.user.username}
                nickname={message.user.nickname}
                message={message.message}
              />
            ))}
        </div>
        <Recommendations className="feed__recommendations" />
      </div>
    </div>
  );
};

export default Feed;
