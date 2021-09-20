const sql = require("../DB/db.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//using session secret to mennage login
var session = require('express-session');
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));


const createNewClient = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const newClient = {
        "email": req.body.email,
        "user_name": req.body.username,
        "password": req.body.psw,
        "first_name": req.body.fname,
        "last_name": req.body.lname,
        "birthdate": req.body.Birthdate,
        
    };
    
    sql.query("INSERT INTO clients SET ?", newClient, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in creating client: " + err });
            return;
        }
        console.log("created client");
        // res.send({ message: "new customer created successfully" });
        return;
    });
};
//read for log in 
const LogIn = function (request, response) {
    const loginClient = {
        "username": request.body.username,
        "password": request.body.psw,
    };
    var username = request.body.username;
    var password = request.body.psw;
    if (username && password) {
        sql.query('SELECT * FROM clients WHERE username = ? AND password = ?', loginClient, function (error, results, fields) {
            if (loginClient) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/homepage');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        console.log("Please enter Username and Password!");
        
    }
}




module.exports = { createNewClient, LogIn };

