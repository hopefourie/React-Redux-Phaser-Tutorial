const Sequelize = require('sequelize');
const db = require('./database');

const Player = db.define('player', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'Newt',
    validate: {
      notEmpty: true,
    },
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Player;
