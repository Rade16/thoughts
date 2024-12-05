import React from "react";
import "./Login.scss";
const Login = () => {
  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Вход</h1>
        <input className="login__input" placeholder="Почта" />
        <input className="login__input" placeholder="Пароль" />
        <button className="login__btn">Войти</button>
      </div>
    </div>
  );
};

export default Login;
