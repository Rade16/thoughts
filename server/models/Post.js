const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Post = sequelize.define("post", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Post };
