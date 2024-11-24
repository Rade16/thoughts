import React from "react";
import "./ProfileCard.scss";
import avatar from "../../assets/avatar.jpg";
const ProfileCard = () => {
  return (
    <div className="profileCard">
      <div className="profileCard__bg"></div>
      <div className="profileCard__info">
        <img src={avatar} alt="" className="profileCard__info-avatar" />
        <div className="profileCard__info-name">Роберт</div>
        <div className="profileCard__info-username">@kayaflower</div>
        <p className="profileCard__info-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quod
        </p>

        <div className="profileCard__info-btn">Мой профиль</div>
      </div>
    </div>
  );
};

export default ProfileCard;
