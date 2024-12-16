import React, { useState } from "react";
import "./Registration.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/registration`,
        {
          username,
          password,
          nickname,
          email,
        }
      );
      navigate("/");
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        const { errors } = error.response.data;
        if (Array.isArray(errors)) {
          alert(errors.join("\n"));
        } else {
          alert(error.response.data.message);
        }
      }
    }
  };
  return (
    <div className="registration">
      <form action="" className="registration__form" onSubmit={handleSubmit}>
        <h1 className="registration__title">Создание аккаунта</h1>
        <input
          type="text"
          className="registration__input"
          placeholder="Имя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className="registration__input"
          placeholder="Ник"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="email"
          className="registration__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="registration__input"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registration__btn" type="submit">
          Создать аккаунт
        </button>
      </form>
      <p className="registration__text">Уже есть аккаунт?</p>
      <Link to="/">
        <p className="registration__text-link">Войти</p>
      </Link>
    </div>
  );
};

export default Registration;
