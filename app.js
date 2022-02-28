"use strict";

require('dotenv').config()
const express = require("express");
const cors = require("cors");
const routers = require("./routers/index")

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routers)

app.listen(port, () => {
    console.log(`Mini Wallet app is listening at http://localhost:${port} 🚀`)
 })