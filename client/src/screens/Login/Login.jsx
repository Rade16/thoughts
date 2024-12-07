import React, { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      const userResponse = await axios.get(
        "http://localhost:5000/api/auth/auth",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(userResponse.data.user);
      navigate("/profile");
    } catch (e) {
      setError("Ошибка входа: неверный email или пароль");
    }
  };
  return (
    <div className="login">
      <form action="" className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Вход</h1>
        <input
          className="login__input"
          placeholder="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login__input"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__btn" type="submit">
          Войти
        </button>
      </form>
      <p className="registration__text">Еще нет аккаунта?</p>
      <Link to="/registration">
        <p className="registration__text-link">Зарегистрироваться</p>
      </Link>
    </div>
  );
};

export default Login;
