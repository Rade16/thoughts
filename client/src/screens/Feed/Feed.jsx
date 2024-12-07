import React, { useState, useEffect } from "react";
import "./Feed.scss";
import Navigation from "../../components/Navigation/Navigation";
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import Message from "../../components/Message/Message"
import MessageInput from "../../components/MessageInput/MessageInput";
import Recommendations from "../../components/Recommendations/Recommendations";
import axios from "axios";
const Feed = () => {
  const [recipes, setRecipes] = useState([]);

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
  }, []);
  return (
    <div className="feed">
      <Navigation />
      <div className="feed__container">
        <div className=""></div>
        <div className="feed__messages">
        {
          recipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((recipe) => (
            <Message
              key={recipe.id}
              username={recipe.username}
              nickname={recipe.nickname}
              description={recipe.description}
            />
          ))
        }
        
        </div>
      <Recommendations className="feed__recommendations"/>
      </div>
    </div>
  );
};

export default Feed;
