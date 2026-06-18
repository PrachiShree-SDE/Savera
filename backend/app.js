const express = require('express');
const app = express();
const connectDB = require("./src/config/database");
const cookieParser = require('cookie-parser');
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));



const authRouter = require('./src/routes/auth');
const profileRouter = require('./src/routes/profile');
const adminRouter = require('./src/routes/admin');
const productRouter = require('./src/routes/product');

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',adminRouter);
app.use('/',productRouter);

connectDB()
    .then(() => {
        console.log("Database connected successfully.")

        app.listen(5000, () => {
            console.log("Server is listening at http://localhost:5000");
        });
    })

