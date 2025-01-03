import React, { useState } from "react";
import "./ProfileEdit.scss";
import Navigation from "../../components/Navigation/Navigation";
import avatar from "../../assets/avatar.svg";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
const ProfileEdit = () => {
  const { user } = useAuth();
  if (!user) {
    return <p>Загрузка...</p>;
  }

  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");

  const formData = new FormData();
  if (avatar) {
    formData.append("avatar", avatar);
  }
  formData.append("username", username);
  formData.append("nickname", nickname);
  formData.append("bio", bio);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
    const file = e.target.files[0];
    setPreviewAvatar(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/update-profile/${user.id}`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(user.id);
  return (
    <div className="profileEdit">
      <Navigation />
      <div className="profileEdit__container">
        <form action="" onSubmit={handleSubmit}>
          <div className="profileEdit__user">
            <label htmlFor="file" className="profileEdit__user-avatar">
              <input
                type="file"
                accept="image/*"
                id="file"
                onChange={handleAvatarChange}
                className="profileEdit__user-avatar-input"
              />
              <img
                src={previewAvatar || `http://localhost:5000${user.avatar}`}
                alt=""
                className="profileEdit__user-avatar-img"
              />
            </label>
            <div className="profileEdit__user-inputs">
              <div className="profileEdit__user-inputs-line">
                <label htmlFor="username">Имя</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Имя"
                  className="profileEdit__user-inputs-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="profileEdit__user-inputs-line">
                <label htmlFor="nickname">Никнейм</label>
                <input
                  id="nickname"
                  type="text"
                  placeholder="Никнейм"
                  className="profileEdit__user-inputs-input"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
            </div>
          </div>
          <label htmlFor="" className="profileEdit__user-bio-label">
            О себе:
          </label>
          <textarea
            className="profileEdit__user-bio"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis, purus ac blandit "
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
              console.log("Текущее значение bio:", e.target.value); // Проверяем, что значение обновляется
            }}
          />

          <button className="profileEdit__user-btn" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
