const { green, red } = require('chalk');
const { db, Player } = require('./server/db');

const seedPlayers = [
  {
    name: 'wizkid',
    score: 28,
  },
  {
    name: 'gnomegrrrl',
    score: 94,
  },
  {
    name: 'goblinkween',
    score: 47,
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(seedPlayers.map((player) => Player.create(player)));
    console.log(green('Database successfully seeded 👾'));
    db.close();
    // seed your database here!
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
