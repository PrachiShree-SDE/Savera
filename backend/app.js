const express = require('express');
const app = express();
const connectDB = require("./src/config/database");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./src/routes/auth');
const profileRouter = require('./src/routes/profile');

app.use('/',authRouter);
app.use('/',profileRouter);

connectDB()
    .then(() => {
        console.log("Database connected successfully.")

        app.listen(5000, () => {
            console.log("Server is listening at http://localhost:5000");
        });
    })

