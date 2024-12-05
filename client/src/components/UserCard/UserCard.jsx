import React from 'react'
import avatar from "../../assets/avatar.jpg"
import "./UserCard.scss"
const UserCard = () => {
  return (
    <div className='userCard'>
        <div className="userCard__container">
            <img src={avatar} alt="" className='userCard__avatar' />
            <div className="userCard__info">
                <p className='userCard__info-name'>Робрет</p>
                <p className='userCard__info-username'>@kayaflower</p>
                
            </div>
        </div>
    </div>
  )
}

export default UserCard