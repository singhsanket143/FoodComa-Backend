const { loginUser } = require("../services/authService");


async function logout(req, res) {
    res.cookie("authToken", "", {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json({
        success: true,
        message: "Log out successfull",
        error: {},
        data: {}
    });
}
async function login(req, res) {
    
    try {
        const loginPayload = req.body;

        const response = await loginUser(loginPayload);

        res.cookie("authToken", response, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: {},
            error: {}
        })
    } catch(error) {
        return res.status(error.statusCode).json({
            success: false,
            data: {},
            message: error.message,
            error: error
        })
    }

}

module.exports = {
    login,logout
}