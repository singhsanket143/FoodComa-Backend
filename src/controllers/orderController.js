const { createOrder, updateOrder, getAllOrdersCreatedByUser, getOrderDetailsById } = require("../services/orderService");
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

async function getAllOrdersByUser(req, res) {
    try {
        const order = await getAllOrdersCreatedByUser(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the orders",
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

async function getOrder(req, res) {
    try {
        const order = await getOrderDetailsById(req.params.orderId);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the order",
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

async function cancelOrder(req, res) {
    try {
        const order = await updateOrder(req.params.orderId, "CANCELLED");
        return res.status(200).json({
            success: true,
            message: "Successfully updated the order",
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

async function changeOrderStatus(req, res) {
    try {
        const order = await updateOrder(req.params.orderId, req.body.status);
        return res.status(200).json({
            success: true,
            message: "Successfully updated the order",
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
    createNewOrder,
    changeOrderStatus,
    cancelOrder,
    getOrder,
    getAllOrdersByUser
}