const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

app.listen(5000, () => {
    console.log("Server running at 5000")
})