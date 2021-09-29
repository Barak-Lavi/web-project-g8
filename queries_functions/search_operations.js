const sql = require("../DB/db.js");
const util = require("util");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');

const query = util.promisify(sql.query).bind(sql);

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
            if (true) {
                const email = 'as3d@gmail.com';
                sql.query('SELECT * FROM search_history WHERE email = ?', email, function (error, results) {
                    const searchObj = {
                        email,
                        destination: req.body.DestinationL
                    }
                    if (results.length === 0) {
                        searchObj.search_number = 1;
                        sql.query("INSERT INTO search_history SET ?", searchObj, (err, mysqlres) => {
                            if (err) {
                                console.log("error: ", err);
                                return;
                            }
                            console.log("created searchObj");
                            return;
                        });
                    } else {
                        searchObj.search_number = results[0].search_number + 1;
                        sql.query("UPDATE search_history SET ? WHERE email = ?", [searchObj, email], (err, mysqlres) => {
                            if (err) {
                                console.log("error: ", err);
                                return;
                            }
                            console.log("updated searchObj");
                            return;
                        });
                    }
                });
            }

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
       
    




const getTopShutteles = async function() {
    if (true) {
        const email = 'as3d@gmail.com';
        const topSearchs = await query('SELECT * FROM search_history WHERE email = ? ORDER BY search_number LIMIT 1', email);
        const missingTripsNumber = 3 - topSearchs.length;
        const trips = await query(`SELECT * FROM shuttles ORDER BY departure_date LIMIT ${missingTripsNumber}`);        for (var i = 0; i < topSearchs.length; i++) {
            const trip = await query('SELECT * FROM shuttles WHERE destination = ? ORDER BY departure_date LIMIT 1', topSearchs[i].destination);
            trips.push(trip[0]);
        }
        return trips;
    }
    return await query('SELECT * FROM shuttles ORDER BY departure_date LIMIT 3');
}

const getTrips = async function() {
    const locations_trips = {};
    const locations = await query('SELECT * FROM locations');
    for (let i = 0; i < locations.length; i++) {
        location = locations[i].location;
        const trips =  await query('SELECT * FROM shuttles WHERE destination=?', location);
        locations_trips[location] = trips;
    }
    return { locations, locations_trips };
}


module.exports = { searchmenu, Purchaseform, MakePurchase, getTopShutteles, getTrips };
