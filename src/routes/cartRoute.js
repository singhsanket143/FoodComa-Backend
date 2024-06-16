const express = require('express');
const {  getCartByUser } = require('../controllers/cartController.js');
const { isLoggedIn } = require('../validation/authValidator.js');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn, getCartByUser);

module.exports = cartRouter;