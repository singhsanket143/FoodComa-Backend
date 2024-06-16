const express = require('express');
const {  getCartByUser, modifyProductTocart, clearCartbyId } = require('../controllers/cartController.js');
const { isLoggedIn } = require('../validation/authValidator.js');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn, getCartByUser);

cartRouter.post('/:operation/:productId', isLoggedIn, modifyProductTocart);


cartRouter.delete('/products', isLoggedIn, clearCartbyId);

module.exports = cartRouter;