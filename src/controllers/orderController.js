const { createOrder } = require("../services/orderService");
const AppError = require("../utils/appError");

async function createNewOrder(req, res) {
    try {
        const order = await createOrder(req.user.id, req.body.paymentMethod);
        return res.status(201).json({
            success: true,
            message: "Successfully created the order",
            error: {},
            data: order
        })
    } catch(error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

module.exports = {
    createNewOrder
}