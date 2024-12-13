import React from "react";
import "./Navigation.scss";
import logo from "../../assets/logo.svg";
import profile from "../../assets/navigation/profile.svg";
import list from "../../assets/navigation/list.svg";

import { NavLink } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
const Navigation = () => {
  const { user } = useAuth();
  if (!user) {
    return <p>Загрузка...</p>;
  }
  return (
    <div className="navigation">
      <div className="navigation__container">
        <img src={logo} alt="" />
        <ul className="navigation__list">
          <li className="">
            <NavLink
              to={`/profile/${user.id}`}
              className={({ isActive }) =>
                isActive
                  ? "navigation__list-item active"
                  : "navigation__list-item"
              }
            >
              <img src={profile} alt="" className="navigation__list-item-img" />
              Профиль
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                isActive
                  ? "navigation__list-item active"
                  : "navigation__list-item"
              }
            >
              <img src={list} alt="" className="navigation__list-item-img" />
              Лента
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
