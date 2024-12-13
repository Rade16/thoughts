import React, { useState, useEffect } from "react";
import "./ProfileCard.scss";
import avatar from "../../assets/avatar.jpg";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
const ProfileCard = () => {
  const { user, setUser } = useAuth();

  const [currentUser, setCurrentUser] = useState(null);
  const { id } = useParams();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    alert("Вы вышли из аккаунта");
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/auth/user/${id}`
      );

      console.log(response.data);
      setCurrentUser(response.data);
    };
    console.log(id);
    fetchCurrentUser();
  }, [id]);

  if (!currentUser) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="profileCard">
      <div className="profileCard__bg"></div>
      <div className="profileCard__info">
        <img
          src={`http://localhost:5000${currentUser.avatar}`}
          alt=""
          className="profileCard__info-avatar"
        />
        <div className="profileCard__info-name">{currentUser.username}</div>
        <div className="profileCard__info-username">{currentUser.nickname}</div>
        <p className="profileCard__info-description">{currentUser.bio}</p>

        <div className="profileCard__info-btn">
          <Link
            to={`/profileEdit/${user.id}`}
            className="profileCard__info-link"
          >
            Мой профиль
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
