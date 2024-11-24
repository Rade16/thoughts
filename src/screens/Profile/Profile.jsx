import React from "react";
import "./Profile.scss";
import Navigation from "../../components/Navigation/Navigation";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Message from "../../components/Message/Message";
import MessageInput from "../../components/MessageInput/MessageInput";
const Profile = () => {
  return (
    <div className="profile">
      <Navigation />
      <div className="profile__container">
        <ProfileCard />
        <div className="profile__messages">
          <MessageInput />
          <Message />
          <Message />
          <Message />
        </div>
      </div>
    </div>
  );
};

export default Profile;
