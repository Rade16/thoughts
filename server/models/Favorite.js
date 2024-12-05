const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Favorite = sequelize.define("favorite", {});

module.exports = { Favorite };
