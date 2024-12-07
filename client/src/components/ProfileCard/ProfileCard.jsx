import React from "react";
import "./ProfileCard.scss";
import avatar from "../../assets/avatar.jpg";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
const ProfileCard = () => {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    alert("Вы вышли из аккаунта");
  };

  console.log("пользователь:", user);
  console.log("пользователь:", user.username);
  return (
    <div className="profileCard">
      <div className="profileCard__bg"></div>
      <div className="profileCard__info">
        <img src={avatar} alt="" className="profileCard__info-avatar" />
        <div className="profileCard__info-name">{user.username}</div>
        <div className="profileCard__info-username">{user.nickname}</div>
        <p className="profileCard__info-description">
          {user.bio}
        </p>

        <div className="profileCard__info-btn"><Link to={`/profileEdit/${user.id}`} className="profileCard__info-link">Мой профиль</Link></div>
      </div>
    </div>
  );
};

export default ProfileCard;
