const sql = require("../DB/db.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');

//using session secret to mennage login
var session = require('express-session');
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

var isLogedIn = require('./CRUD_functions.js');
var Loggedin = isLogedIn.Loggedin;

const { isNull } = require("util");
const { ENOTEMPTY } = require("constants");

const searchmenu = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "search menu is empty"
        });
        return;
    };
    var current_location = req.body.CurrentL;
    var destination = req.body.DestinationL;
    var Tickets = req.body.Tickets;
    var departure_date = req.body.DepartureDate;
    var ComebackDate = req.body.ComebackDate;
    //validation function that will show the search result form
    
    //enter into checkbox the shuttle ID
    //depurture
    if (!departure_date) {
        sql.query('SELECT * FROM shuttles WHERE current_location = ? AND capacity >= ?', [current_location, Tickets], function (error, results, fields) {
            console.log("search without depurture date");
        });
    } else {
        sql.query('SELECT * FROM shuttles WHERE current_location = ? AND capacity >= ? AND departure_date=?', [current_location, Tickets, departure_date], function (error, results, fields) {
            console.log("search with depurture date");
        });
        

    }
    //return flight
    if (!ComebackDate) {
        sql.query('SELECT * FROM shuttles WHERE destination = ? AND capacity >= ?', [current_location, Tickets], function (error, results, fields) {
            console.log("search without return date");
        });
    } else {
        sql.query('SELECT * FROM shuttles WHERE destination = ? AND capacity >= ? AND departure_date=?', [current_location, Tickets, ComebackDate], function (error, results, fields) {
            console.log("search with return date");
            console.log(Loggedin);
        });

    }
    res.render('SearchResult');
    return;
}



const Purchaseform = function (req, res) {
   /* console.log(Loggedin);
    if (!Loggedin) {
        console.log("for purchase flight you have to log in your acount or sing in");
        return;
    }*/
    if (!req.body) {
        res.status(400).send({
            
            alert: "did not find flights"
        });
        return;
    };
    var depurtueFlight = req.app.depurtureFlight;
    var returnFlight = req.app.returnFlight;
    
    if (depurtueFlight && returnFlight) {


    } else {
        console.log("did not choose depurtue and return flights");

    }
    res.render('PurchaseForm');
    return;
};

const MakePurchase = function (req, res) {
    if (!req.body) {
        res.status(400).send({

            alert: "empty"
        });
        return;
    };
    //query to check if the client already hade a credit card saved

    const addCredit = {
        "credit_number": req.body.ccnum,
        "exp_month": req.body.expmonth,
        "exp_year": req.body.expyear,
        "cvv": req.body.cvv,
        //"email": req.body.lname///TODO
        
    };
    var credit_number = req.body.ccnum;
    sql.query('SELECT * FROM credit_cards WHERE credit_number = ? ', credit_number, function (error, results, fields) {
        if (results) {
            console.log("credit card already in use with client" + results + "dddd");
            //TODO ADD tickets to client
            return;
        } else {
            sql.query("INSERT INTO credit_cards SET ?", addCredit, (err, mysqlres) => {
                if (err) {
                    console.log("error: ", err);
                    res.status(400).send({ message: "error in creating addCredit: " + err });
                    return;
                }
                console.log("created addCredit");
                // res.send({ message: "new customer created successfully" });
                return;
            });
        }
       /*
         sql.query("INSERT INTO passengers SET ?", , (err, mysqlres) => {
            if (err) {
                console.log("error: ", err);
                res.status(400).send({ message: "error in creating addCredit: " + err });
                return;
            }
            console.log("created addCredit");
            // res.send({ message: "new customer created successfully" });
            return;
        });*/
       
    });
    res.render('MyOrders');
    return;
}




module.exports = { searchmenu, Purchaseform, MakePurchase};