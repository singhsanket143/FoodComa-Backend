const express = require('express');
const { addProduct, getProduct, deleteProduct } = require('../controllers/productController');
const uploader = require('../middlewares/multerMiddleware');
const { isLoggedIn, isAdmin } = require('../validation/authValidator');

const productRouter = express.Router();

productRouter.post(
    '/', 
    isLoggedIn, 
    isAdmin, 
    uploader.single('productImage'), 
    addProduct
);

productRouter.get('/:id', getProduct);
productRouter.delete('/:id',deleteProduct);
// GET /products/:id 
// delete /products/:id
module.exports = productRouter;