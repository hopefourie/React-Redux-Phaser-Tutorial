const db = require('./database');
const Post = require('./Post');
const User = require('./User');

Post.belongsTo(User);
User.hasMany(Post);

module.exports = {
  db,
  User,
  Post,
};
