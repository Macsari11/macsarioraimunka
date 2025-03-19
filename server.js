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
    database: "atletikavb2017",
});

db.connect(err => {
    if (err) {
        console.error("Adatbázis kapcsolódási hiba: ", err);
    } else {
        console.log("Sikeres adatbázis kapcsolat!");
    }
});

app.get("/", (req, res) => {
    res.send("A backend fut");
});


app.get('/60perc', (req, res) => {
    const query = `SELECT VersenySzam FROM versenyekszamok WHERE (SUBSTRING_INDEX(Eredmeny, ':', 1) * 60 + SUBSTRING_INDEX(Eredmeny, ':', -1)) / 60 > 60 GROUP BY VersenySzam;`;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Hiba a lekérdezés során');
        } else {
            res.json(results);
        }
    });
});

 
app.post('/nemzethozzaad', (req, res) => {
    const { Nemzet } = req.body;
    const query = 'INSERT INTO nemzetek (Nemzet) VALUES (?)';
    db.query(query, [Nemzet], (err, result) => {
        if (err) {
            res.status(500).send('Hiba a nemzet hozzáadása során');
        } else {
            res.status(201).send('Nemzet sikeresen hozzáadva');
        }
    });
});



app.listen(3001, () => {
    console.log("A szerver fut a 3001-es porton");
});
