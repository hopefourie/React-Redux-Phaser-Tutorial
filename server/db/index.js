const db = require('./database');
const Post = require('./Post');

Post.belongsTo(User);
User.hasMany(Post);

module.exports = {
  db,
  User,
  Post,
};
