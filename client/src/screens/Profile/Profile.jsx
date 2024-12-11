import React, { useState, useEffect } from "react";
import "./Profile.scss";
import Navigation from "../../components/Navigation/Navigation";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Message from "../../components/Message/Message";
import MessageInput from "../../components/MessageInput/MessageInput";
import Recommendations from "../../components/Recommendations/Recommendations";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
const Profile = () => {
  const { user } = useAuth();
  if (!user) {
    return <p>Загрузка...</p>;
  }
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
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

      setRecipes(response.data);
    };
    fetchRecipes();
  }, []);

  return (
    <div className="profile">
      <Navigation />
      <div className="profile__container">
        <div className="profile__profilecard">
          <ProfileCard />
        </div>
        <div className="profile__messages">
          <MessageInput />
          {recipes
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((recipe) => (
              <Message
                key={recipe.id}
                username={recipe.username}
                nickname={recipe.nickname}
                description={recipe.description}
              />
            ))}
        </div>
        <Recommendations />
      </div>
    </div>
  );
};

export default Profile;
