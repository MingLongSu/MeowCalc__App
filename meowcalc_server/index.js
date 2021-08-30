const express = require('express');
const app = express();

const mysql = require('mysql');

const cors = require('cors');

const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

const meowcalc_auth_db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'password', 
    database: 'meowcalc_auth'
})

app.post('/register-account', async (req, res) => {
    const salt = 10;

    const id = req.body.id;
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, salt);
    const lastLogin = req.body.lastLogin;

    const insertToTable = 'INSERT INTO users (id, username, password, lastLogin) VALUES (?, ?, ?, ?);'

    meowcalc_auth_db.query(insertToTable, [id, username, password, lastLogin], (err, result) => {
        if (err) { 
            console.log(err);
        }
        else { 
            console.log('user registered');
        }
    })
})

app.listen(3001, () => { 
    console.log('server-side ready');
})

