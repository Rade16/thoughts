const sequelize = require("../db");
const { User } = require("./User");
const { Post } = require("./Post");
const { Favorite } = require("./Favorite");

User.hasMany(Post, { foreignKey: "user_id", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "user_id" });

User.belongsToMany(Post, { through: Favorite, foreignKey: "user_id" });
Post.belongsToMany(User, { through: Favorite, foreignKey: "post_id" });

module.exports = {
  sequelize,
  User,
  Post,
  Favorite,
};
