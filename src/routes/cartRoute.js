const express = require('express');
const { getCartById } = require('../controllers/cartController.js');

const cartRouter = express.Router();

cartRouter.get('/:id', getCartById);

module.exports = cartRouter;