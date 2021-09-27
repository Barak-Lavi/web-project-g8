const sql = require("../DB/db.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();



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
                response.render('homepage', { 'LoggedInUser': LoggedInUser[0].email});
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
}



module.exports = { createNewClient, LogIn};


