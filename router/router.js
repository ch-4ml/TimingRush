const express = require('express');
const router = express.Router();

const userRouter = require('./user_router');
const gameRouter = require('./game_router');
const dataRouter = require('./data_router');

router.use(userRouter);
router.use(gameRouter);
router.use(dataRouter);

module.exports = router;