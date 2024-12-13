const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Post = sequelize.define("post", {
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Post };
