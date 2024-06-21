const cloudinary = require('../config/cloudinaryConfig');
const ProductRespository = require('../repositories/productRepository');
const fs = require('fs/promises');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails) {
    // 1. We should check if an image is coming to create the product, then we should first upload it on 
    // cloudinary

    const imagePath = productDetails.imagePath;
    if (imagePath) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            productDetails.productImage= cloudinaryResponse.secure_url;
            // console.log(productImage);
            await fs.unlink(imagePath);
        } catch (error) {
            console.log(error);
            throw new InternalServerError();
        }

    }

    // 2. Then use the url from cloudinary and other propduct details to add product in db
    const product = await ProductRespository.createProduct(productDetails);

    console.log(product);

    return product;


}

async function getProductById(productId) {
    const response = await ProductRespository.getProductById(productId);
    if (!response) {
        throw new NotFoundError('Product');
    }
    return response;
}

async function deleteProductById(productId) {
    const product = await ProductRespository.getProductById(productId);
    if (!product) {
        throw new NotFoundError('Product');
    }
    const imageUrl = product.productImage;
    if (imageUrl) {
        try {
            const splitUrl = imageUrl.split('/');
            const publicId = splitUrl[splitUrl.length - 1].split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        } catch (error) {
            console.log(error);
            throw new InternalServerError();
        }
    }
    const response = await ProductRespository.deleteProductById(productId);
    if (!response) {
        throw new NotFoundError('Product');
    }
    return response;
}


module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}