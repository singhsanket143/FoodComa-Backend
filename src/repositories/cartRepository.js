const Cart = require('../schema/cartSchema');
const InternalServerError = require('../utils/internalServerError');

async function createcart(userId) {
    try {
        const newCart = await Cart.create({
            user: userId
        });
        return newCart;
    } catch(error) {
        if(error.name === 'ValidationError') {

            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        } 
        console.log(error);
        throw new InternalServerError();
    }
}

async function getCartByUserId(userId) {
    try {
        const cart = await Cart.findOne({
            user: userId
        });
        return cart;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

module.exports = {
    createcart,
    getCartByUserId
}