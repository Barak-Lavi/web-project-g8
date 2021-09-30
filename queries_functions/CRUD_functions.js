const sql = require("../DB/db.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();


//using session secret to mennage login
var session = require('express-session');
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

var Loggedin = false;
var user;

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
        
        return;
    });
};
//read for log in 
const LogIn = function (request, response) {
    var loginClient = {
        "username": request.body.username,
        "password": request.body.psw,

    };
    
    if (loginClient.username && loginClient.password) {
        sql.query('SELECT * FROM clients WHERE user_name=? AND password = ?', [loginClient.username, loginClient.password], function (err ,result) {
            if (err) {
                console.log("error: ", err);
                response.status(400).send({ message: "error in finding client: " + err });
                return;
            }
            
            else if (result.length > 0) {

                
                LoggedInUser = JSON.parse(JSON.stringify(result));
                
                console.log(LoggedInUser[0].email + ' has loggedIn');
                response.render('homepage',  { 'LoggedInUser': LoggedInUser[0].email } );
            } else {
                console.log("user name or password are incurrect");
                response.send(('<script>alert("user name or password are incurrect");window.location.href = "http://localhost:3000/homepage";</script>'));
                
                return;
            }
            response.end();
        });
    } else {
        console.log("Please enter Username and Password!");
        response.send(('<script>alert("Please enter Username and Password!");window.location.href = "http://localhost:3000/homepage";</script>'));

    }
    return;
}



const createNewWanted = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const newWanted = {
        "first_name": req.body.fname,
        "last_name": req.body.lname,
        "phone_number": req.body.phone,
        "email": req.body.email,
        "submitted_job": req.body.job
    };
    
    sql.query("INSERT INTO wanted SET ?", newWanted, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in creating wanted: " + err });
            return;
        }
        console.log("created wanted");
        // res.send({ message: "new customer created successfully" });
        return;
    });
};

const createNewContact = function (req, res) {
    console.log(req.body)
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const newContact = {
        "email": req.body.email,
        "message": req.body.subject
    };
    
    sql.query("INSERT INTO contact_us SET ?", newContact, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in creating contact: " + err });
            return;
        }
        console.log("created contact");
        // res.send({ message: "new customer created successfully" });
        return;
    });
};


module.exports = { createNewClient, LogIn, Loggedin, user, createNewWanted, createNewContact};




