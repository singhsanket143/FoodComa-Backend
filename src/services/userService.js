const { findUser, createUser } = require("../repositories/userRepository");
const { createcart } = require('../repositories/cartRepository');

async function registerUser(userDetails) {
    console.log("Hitting service layer")
    // It will create a brand new user in the db

    // 1. We need to check if the user with this email and mobile number already exists or not
    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber
    });

    if(user) {
        // we found a user
        throw { reason: 'User with the given email and mobile number already exist', statusCode: 400 }
    }
    
    // 2. If not then create the user in the database
    const newUser = await createUser({
        email: userDetails.email,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber
    });

    if(!newUser) {
        throw {reason: 'Something went wrong, cannot create user', statusCode: 500}
    }

    await createcart(newUser._id);

    // 3. retuern the details of created user
    return newUser;
}


module.exports = {
    registerUser
};