const sql = require("../DB/db.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');



const searchmenu = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "search menu is empty"
        });
        return;
    };


    var FlightsSearch = {

        'current_location': req.body.CurrentL,
        'destination': req.body.DestinationL,
        'departure_date': req.body.DepartureDate,
        'ComebackDate': req.body.ComebackDate,
    }
    var LoggedInUser = req.body.LoggedInUser;
    
    console.log(LoggedInUser);
    
    var DepurtureShuttelList = [];
    var ReturnShuttelList = [];
    //var DepurtureShuttel = { 'ID': String, 'from': String, 'to': String, 'depurtuedate': Date, 'capacity': Int16Array, 'price': Int16Array };

    //enter into checkbox the shuttle ID
    //depurture
   
    if (!FlightsSearch.departure_date) {
        sql.query('SELECT * FROM shuttles WHERE current_location = ? AND destination= ?', [FlightsSearch.current_location, FlightsSearch.destination], function (error, results) {
            if (error) {
                console.log("error: ", err);
                response.status(400).send({ message: "error in finding shuttles: " + err });
                return;
            }
            console.log('results.length= ' + results.length);
            if (results.length > 0) {
                for (var i = 0; i < results.length; i++) {
                    var DepurtureShuttel = {
                        'ID': results[i].ID,
                        'from': results[i].current_location,
                        'to': results[i].destination,
                        'depurtuedate': results[i].departure_date,
                        'capacity': results[i].capacity, // todo culc function
                        'price': results[i].ticket_price,
                    }
                    
                    DepurtureShuttelList.push(DepurtureShuttel);
                }
            }
            
        });
    } else {
        sql.query('SELECT * FROM shuttles WHERE current_location = ? AND destination = ? AND departure_date=?', [FlightsSearch.current_location, FlightsSearch.destination, FlightsSearch.departure_date], function (error, results, fields) {
            console.log("search with depurture date");
            if (error) {
                console.log("error: ", err);
                response.status(400).send({ message: "error in finding shuttles: " + err });
                return;
            }
            console.log('results.length= ' + results.length);
            if (results.length > 0) {
                for (var i = 0; i < results.length; i++) {
                    var DepurtureShuttel = {
                        'ID': results[i].ID,
                        'from': results[i].current_location,
                        'to': results[i].destination,
                        'depurtuedate': results[i].departure_date,
                        'capacity': results[i].capacity, // todo culc function
                        'price': results[i].ticket_price,
                    }
                    DepurtureShuttelList.push(DepurtureShuttel);
                }               
            }
        });
    }
    
    if (!FlightsSearch.ComebackDate) {
        sql.query('SELECT * FROM shuttles WHERE current_location = ? AND destination= ?', [FlightsSearch.destination, FlightsSearch.current_location], function (error, results) {
            if (error) {
                console.log("error: ", err);
                response.status(400).send({ message: "error in finding shuttles: " + err });
                return;
            }
            console.log('results.length= ' + results.length);
            if (results.length > 0) {
                for (var i = 0; i < results.length; i++) {
                    var ReturnShuttel = {
                        'ID': results[i].ID,
                        'from': results[i].current_location,
                        'to': results[i].destination,
                        'depurtuedate': results[i].departure_date,
                        'capacity': results[i].capacity, // todo culc function
                        'price': results[i].ticket_price,
                    }
                    ReturnShuttelList.push(ReturnShuttel);
                }
                res.render('SearchResult', { "DepurtureShuttelList": DepurtureShuttelList, "ReturnShuttelList": ReturnShuttelList, 'LoggedInUser': LoggedInUser});
            }
        });
    } else {
        sql.query('SELECT * FROM shuttles WHERE current_location = ? AND destination = ? AND departure_date=?', [FlightsSearch.destination, FlightsSearch.current_location, FlightsSearch.ComebackDate], function (error, results, fields) {
            console.log("search with depurture date");
            if (error) {
                console.log("error: ", err);
                response.status(400).send({ message: "error in finding shuttles: " + err });
                return;
            }
            console.log('results.length= ' + results.length);
            if (results.length > 0) {
                for (var i = 0; i < results.length; i++) {
                    var ReturnShuttel = {
                        'ID': results[i].ID,
                        'from': results[i].destination,
                        'to': results[i].current_location,
                        'depurtuedate': results[i].departure_date,
                        'capacity': results[i].capacity, // todo culc function
                        'price': results[i].ticket_price,
                    }
                    ReturnShuttelList.push(ReturnShuttel);
                }
                res.render('SearchResult', { "DepurtureShuttelList": DepurtureShuttelList, "ReturnShuttelList": ReturnShuttelList, 'LoggedInUser': LoggedInUser});
            }
        });
    }
}



const Purchaseform = function (req, res) {
    var LoggedInUser = req.body.LoggedInUser;

    console.log(LoggedInUser);

    if (!LoggedInUser) {
        console.log("for purchase flight you have to log in your acount or sing in");
        return;
    }
    if (!req.body) {
        res.status(400).send({           
            alert: "did not find flights"
        });
        return;
    };
    
    var DepurtureShuttel= req.body.DepurtureShuttel;
    DepurtureShuttel= JSON.parse(JSON.stringify(req.body.DepurtureShuttel));
    var ReturnShuttel = req.body.ReturnShuttel;
    

    console.log(DepurtureShuttel);
    console.log(DepurtureShuttel[0].price);
    

    if (DepurtureShuttel || ReturnShuttel) {

        res.render('PurchaseForm', { 'DepurtureShuttel': DepurtureShuttel, 'ReturnShuttel': ReturnShuttel });

    } else {
        console.log("did not choose depurtue and return flights");

    }
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
    var depurtueFlight = req.body.depurtueFlight;
    var returnFlight = req.body.returnFlight;
    const addCredit = {
        "credit_number": req.body.ccnum,
        "exp_month": req.body.expmonth,
        "exp_year": req.body.expyear,
        "cvv": req.body.cvv,
        "email": null
        
    };
    sql.query('SELECT * FROM credit_cards WHERE credit_number = ? ', addCredit.credit_number, function (error, results, fields) {
        if (results) {
            console.log("credit card already in use with client" + results + "dddd");

            return;
        } else {
            sql.query("INSERT INTO credit_cards SET ?", addCredit, (err, mysqlres) => {
                if (err) {
                    console.log("error: ", err);
                    res.status(400).send({ message: "error in creating addCredit: " + err });
                    return;
                }
                console.log("created addCredit");
                return;
            });

        }
         //TODO ADD tickets to client
        res.render('MyOrders');
        return;
    });

}
    /*sql.query('SELECT * FROM credit_cards WHERE credit_number = ? ', credit_number, function (error, results, fields) {
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
        }*/
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
       
    




module.exports = { searchmenu, Purchaseform, MakePurchase };