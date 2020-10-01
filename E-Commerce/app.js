const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { connectMysql } = require('./data/db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/auth",require("./routes/auth"));
app.use("/abc",require("./routes/abc"));
app.use("/Categoryy",require("./routes/Categoryy"));
app.use("/Product",require("./routes/Product"));
app.use("/cart",require("./routes/cart"));
app.use("/orders",require("./routes/orders"));




app.listen(3000, () =>
    console.log("Server started")
)