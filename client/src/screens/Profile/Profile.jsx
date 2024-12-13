import React, { useState, useEffect } from "react";
import "./Profile.scss";
import Navigation from "../../components/Navigation/Navigation";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Message from "../../components/Message/Message";
import MessageInput from "../../components/MessageInput/MessageInput";
import Recommendations from "../../components/Recommendations/Recommendations";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
const Profile = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Вы не авторизованы");
        return;
      }
      const response = await axios.get(
        `http://localhost:5000/api/posts/my-posts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Ошибка при получении сообщений:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        return <p>dsffsd</p>;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Вы не авторизованы");
          return;
        }

        const responseUser = await axios.get(
          `http://localhost:5000/api/auth/user/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("responseUser.data:", responseUser.data);

        setCurrentUser(responseUser.data);
        fetchMessages();
        console.log("messageResponse.data:", messageResponse.data);
      } catch (error) {
        console.error("Ошибка при получении сообщений:", error);
      }
    };
    fetchData();
  }, [id, user]);

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile">
      <Navigation />
      <div className="profile__container">
        <div className="profile__profilecard">
          <ProfileCard />
        </div>
        <div className="profile__messages">
          <MessageInput setMessages={setMessages} />
          {messages
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((message) => (
              <Message
                key={message.id}
                userId={message.user_id}
                username={message?.user?.username || "Unknown"}
                avatar={message?.user?.avatar || "/path/to/default/avatar.jpg"}
                nickname={message?.user?.nickname || "Unknown"}
                message={message.message}
              />
            ))}
        </div>
        <Recommendations />
      </div>
    </div>
  );
};

export default Profile;
