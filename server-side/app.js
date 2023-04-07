const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./apis/router");
require('dotenv').config();
app.use(cors({ origin: "*" }));
app.use(express.json())
app.use('/task', router)

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB_URL)
app.listen(process.env.PORT, () => {
    console.log(`server started at ${process.env.PORT}`)
})