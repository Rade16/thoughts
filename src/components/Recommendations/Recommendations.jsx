import React from 'react'
import "./Recommendations.scss"
import UserCard from "../UserCard/UserCard"
const Recommendations = () => {
  return (
    <div className='recommendations'>
        <div className="recommendations__container">
            <h1 className='recommendations__title'>
                Рекомендации
            </h1>
            <div className="recommendations__list">
            <UserCard/>
            <UserCard/>
            <UserCard/>
            <UserCard/>
            </div>
        </div>
    </div>
  )
}

export default Recommendations