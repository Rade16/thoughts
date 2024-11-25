import React from "react";
import "./Feed.scss";
import Navigation from "../../components/Navigation/Navigation";
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import Message from "../../components/Message/Message"
import MessageInput from "../../components/MessageInput/MessageInput";
import Recommendations from "../../components/Recommendations/Recommendations";
const Feed = () => {
  return (
    <div className="feed">
      <Navigation />
      <div className="feed__container">
        <div className=""></div>
        <div className="feed__messages">
        <MessageInput/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        </div>
      <Recommendations className="feed__recommendations"/>
      </div>
    </div>
  );
};

export default Feed;
