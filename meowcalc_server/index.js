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
    });
});

app.post('/register-check-users', (req, res) => { 
    const username = req.body.username;

    const checkMeowCalcUsers  = "SELECT * FROM users WHERE username = ?;";

    meowcalc_auth_db.query(checkMeowCalcUsers, [username], (err, result) => { 
        if (err) { 
            res.send({ err: err })
        }

        // Handles when a user is found or not
        if (result.length > 0) { // If found
            res.send({ userFound: true })
        }
        else { // If not found
            res.send({ userFound: false })
        }
    });
});

app.post('/login-check-users', (req, res) => { 
    const username = req.body.username; 

    const checkMeowCalcUsers = "SELECT * FROM users WHERE username = ?;";

    meowcalc_auth_db.query(checkMeowCalcUsers, [username], (err, result) => { 
        if (err) { 
            res.send({ err: err });
        }

        if (result.length > 0) { 
            res.send({ userFound: true });
        }
        else { 
            res.send({ userFound: false });
        }
    });
}); 

app.post('/login-check-credentials', (req, res) => { 
    const salt = 5; 

    const username = req.body.username;
    const password = req.body.password;
    
    const checkMeowCalcUsers = "SELECT * FROM users WHERE username = ?;";

    meowcalc_auth_db.query(checkMeowCalcUsers, [username], (err, usernameResult) => { 
        if (err) {
            res.send({ err: err }); 
        }

        if (usernameResult.length > 0) { 
            usernameResult.forEach(user => { 
                
                bcrypt.compare(password, user.password, async (err, passwordResult) => { 
                    if (err) { 
                        res.send({ err });
                    }

                    if (passwordResult > 0) { 
                        res.send({  
                            loginSuccessful: true, 
                            userId: await bcrypt.hash(user.id.toString(), salt)
                        });
                    }
                    else { 
                        res.send({ 
                            loginSuccessful: false
                        });
                    }
                });
            }); 
        }
    });
}); 


app.listen(3001, () => { 
    console.log('server-side ready');
})

