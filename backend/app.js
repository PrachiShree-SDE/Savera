const express = require('express');
const app = express();
const connectDB = require("./src/config/database");

app.use(express.json());
const authRouter = require('./src/routes/auth');

app.use('/',authRouter);


connectDB()
    .then(() => {
        console.log("Database connected successfully.")

        app.listen(5000, () => {
            console.log("Server is listening at http://localhost:5000");
        });
    })

