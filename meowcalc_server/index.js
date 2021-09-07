const express = require('express');
const app = express();

const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3000/login', 'http://localhost:3000/register'],
    methods: ['GET', 'POST'], 
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    key: 'userId', 
    secret: `temp`, 
    resave: false,
    saveUninitialized: false, 
    cookie: {
        expires: 1000 * 60 * 60 * 24,
    }
}))
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
    const profilePicture = req.body.profilePicture;

    const insertToTable = 'INSERT INTO users (id, username, password, lastLogin, profilePicture) VALUES (?, ?, ?, ?, ?);';

    meowcalc_auth_db.query(insertToTable, [id, username, password, lastLogin, profilePicture], (err, result) => {
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
                        req.session.user = usernameResult;

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

app.get('/login-check-credentials', (req, res) => {
    if (req.session.user) { 
        res.send({ loggedIn: true, user: req.session.user });
    }
    else { 
        res.send({ loggedIn: false });
    }
});

app.post('/update-profile-picture', (req, res) => { 
    const id = req.body.id; 
    const readerResult = req.body.readerResult;

    const updateProfilePicture = "UPDATE users SET profilePicture = ? WHERE id = ?;";

    meowcalc_auth_db.query(updateProfilePicture, [readerResult, id], (err, result) => { 
        if (err) { 
            console.log(err);
        }
        else {
            console.log('profile-picture-updated');
        }
    });
});

app.post('/get-public-acc-details', (req, res) => { 
    const id = req.body.id; 

    const selectStatement = "SELECT username, lastLogin, profilePicture FROM users WHERE id = ?;";

    meowcalc_auth_db.query(selectStatement, [id], (err, result) => { 
        if (err) { 
            res.send({ err: err });
        }

        if (result.length > 0) { 
            res.send({ 
                detailsFound: true, 
                pubDetails: result
            });
        }
        else { 
            res.send({ 
                detailsFound: false
             })
        }
    });
});

app.post('/register-history-dest', (req, res) => {
    const id = req.body.id;
    const historyDest = req.body.historyDest;

    const insertHistoryDest = "INSERT INTO history_dests (id, historyDest) VALUES (?, ?);";
                              
    meowcalc_auth_db.query(insertHistoryDest, [id, historyDest], (err, result) => { 
        if (err) { 
            console.log(err);
        }
        
        if (result) { 
            console.log('history dest added');
        }
    });

    const createNewHistoryTable = `CREATE TABLE ${ historyDest } (calculation VARCHAR(255) NOT NULL, currentOperand VARCHAR(255) NOT NULL, calculationDate VARCHAR(255) NOT NULL);`;

    meowcalc_auth_db.query(createNewHistoryTable, [], (err, result) => { 
        if (err) { 
            console.log(err);
        }

        if (result) { 
            console.log('user history table added')
        }
    });
});

app.post('/get-user-table', (req, res) => { 
    const id = req.body.id;

    const selectUserTable = "SELECT historyDest FROM history_dests WHERE id = ?;"; 

    meowcalc_auth_db.query(selectUserTable, [id], (err, result) => { 
        if (err) { 
            res.send({ err: err });
        }

        if (result.length > 0) { 
            res.send({ userTable: result });
        }
    });
});

app.post('/history-add-calculation', (req, res) => { 
    const userTable = req.body.userTable;
    const calculation = req.body.calculation;
    const currentOperand = req.body.currentOperand;
    const calculationDate = req.body.calculationDate;

    const updateHistory = `INSERT INTO ${ userTable } (calculation, currentOperand, calculationDate) VALUES (?, ?, ?);`;

    meowcalc_auth_db.query(updateHistory, [calculation, currentOperand, calculationDate], (err, result) => {
        if (err) { 
            console.log(err);
        }

        if (result) { 
            console.log('Updated');
        }
    }); 
});

app.get('/logout', (req, res) => { 
    //res.req.cookies('userId', { expires: new Date(0) })
});

app.listen(3001, () => { 
    console.log('server-side ready');
});

