const express = require('express');

const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
// const User = require('./schema/userSchema');

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Routing middleware
// if your req route starts with /users then handle it using userRouter
app.use('/users', userRouter); // connects the router to the server
app.use('/carts', cartRouter);

app.post('/ping', (req, res) => {
    console.log(req.body);
    return res.json({message: "pong"});
})

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}...!!`);

    // const newUser = await User.create({
    //     email: 'a@b.com',
    //     password: '123456',
    //     firstName: 'Jonathan',
    //     lastName: 'Majors',
    //     mobileNumber: '1231231230'
    // });

    // console.log("Created new user");
    // console.log(newUser);
});

// localhost:5500/users - GET
// localhost:5500/carts/736876235 -GET