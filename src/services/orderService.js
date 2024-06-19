const { getCartByUserId, clearCart } = require("../repositories/cartRepository");
const NotFoundError = require("../utils/notFoundError");
const BadRequestError = require('../utils/badRequestError');
const { findUser } = require("../repositories/userRepository");
const { createNewOrder, getOrdersByUserId, getOrderById, updateOrderStatus } = require("../repositories/orderRepository");
const InternalServerError = require("../utils/internalServerError");

async function createOrder(userId, paymentMethod) {

    
    const cart = await getCartByUserId(userId);
    const user = await findUser({ _id: cart.user});
    console.log(cart);
    console.log(user);
    if(!cart) {
        throw new NotFoundError("Cart");
    }

    if(cart.items.length === 0) {
        throw new BadRequestError(["Cart is empty, please add some items to the cart"]);
    }

    const orderObject = {};

    orderObject.user = cart.user;
    orderObject.items = cart.items.map(cartitem => {
        return {product: cartitem.product._id, quantity: cartitem.quantity}
    });

    orderObject.status = "ORDERED";
    orderObject.totalPrice = 0;

    cart.items.forEach((cartItem) => {
        orderObject.totalPrice += cartItem.quantity * cartItem.product.price;
    });

    orderObject.address = user.address;
    orderObject.paymentMethod = paymentMethod;

    const order = await createNewOrder(orderObject);

    if(!order) {
        throw new InternalServerError();
    }

    await clearCart(userId);

    return order;

}

async function getAllOrdersCreatedByUser(userId) {
    const orders = await getOrdersByUserId(userId);
    if(!orders) {
        throw new NotFoundError("Orders");
    }
    return orders;
}

async function getOrderDetailsById(orderId) {
    const order = await getOrderById(orderId);
    if(!order) {
        throw new NotFoundError("Orders");
    }
    return order;
}

async function updateOrder(orderId, status) {
    const order = await updateOrderStatus(orderId, status);
    if(!order) {
        throw new NotFoundError("Orders");
    }
    return order;
}

module.exports = {
    createOrder,
    getAllOrdersCreatedByUser,
    getOrderDetailsById,
    updateOrder
}