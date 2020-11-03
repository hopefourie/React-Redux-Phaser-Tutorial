const { green, red } = require('chalk');
const { db, User, Post } = require('./server/db');

const seedUsers = [
  {
    email: 'john@john.com',
    userName: 'john',
  },
  {
    email: 'sarah@sarah.com',
    userName: 'sarah',
  },
  {
    email: 'nicky@nicky.com',
    userName: 'nicky',
  },
];

const seedPosts = [
  {
    title: 'Chocolate Chip Cookies',
    content: 'They are so delicious. I could eat them everyday.',
    userId: 1,
  },
  {
    title: 'Oatmeal Cookies',
    content: 'They are so delicious. The oats add a nice texture.',
    userId: 1,
  },
  {
    title: 'Sugar Cookies',
    content: 'They are so delicious, but sometimes to sweet for me.',
    userId: 2,
  },
  {
    title: 'Snickerdoodle Cookies',
    content: 'They are so delicious, they taste like christmas.',
    userId: 3,
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(seedUsers.map((user) => User.create(user)));
    await Promise.all(seedPosts.map((post) => Post.create(post)));
    console.log(green('Database successfully seeded 🍪'));
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
