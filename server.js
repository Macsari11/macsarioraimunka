const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    port: 3306,
    password: "",
    database: "felveteli",
});





app.get("/", (req, res) => {
    res.send("A backend fut");
});

app.listen(3001, () => {
    console.log("A szerver fut a 3001-es porton");
});