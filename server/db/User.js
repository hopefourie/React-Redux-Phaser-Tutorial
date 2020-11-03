const Sequelize = require('sequelize');
const db = require('./database');

const User = db.define('user', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://rlv.zcache.com/green_alien_head_classic_round_sticker-rcd47631f447b4b4d9f2edb5f38b8045c_0ugmp_8byvr_704.jpg',
    validate: {
      isUrl: true,
    },
  },
});

module.exports = User;
