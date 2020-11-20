const { Player } = require('../db');

const router = require('express').Router();

//GET /api/players
router.get('/', async (req, res, next) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (error) {
    next(error);
  }
});

//POST /api/players
router.post('/', async (req, res, next) => {
  try {
    const player = await Player.create(req.body);
    res.json(player);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
