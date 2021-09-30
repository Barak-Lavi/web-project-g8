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

        'current_location': req.query.CurrentL,
        'destination': req.query.DestinationL,
        'departure_date': req.query.DepartureDate,
        'ComebackDate': req.query.ComebackDate,
    }
    var LoggedInUser = req.body.LoggedInUser;

    console.log(LoggedInUser);
    
    var DepurtureShuttelList = [];
    var ReturnShuttelList = [];
    //var DepurtureShuttel = { 'ID': String, 'from': String, 'to': String, 'depurtuedate': Date, 'capacity': Int16Array, 'price': Int16Array };

    //enter into checkbox the shuttle ID
    //depurture
   
    if (!FlightsSearch.departure_date) {
        /*
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
            }*/
            

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
                    DepurtureShuttel = JSON.parse(JSON.stringify(DepurtureShuttel));
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
                res.render('SearchResult', { "departureShuttleList": DepurtureShuttelList, "returnShuttleList": ReturnShuttelList, 'LoggedInUser': LoggedInUser});
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

    
    console.log(req.body);
    if (req.body.skip) {
        console.log("test");
        return  res.render('PurchaseForm', req.body);
    }

    // if (!LoggedInUser) {
    //     console.log("for purchase flight you have to log in your acount or sing in");
    //     return;
    // }
    if (!req.body) {
        res.status(400).send({           
            alert: "did not find flights"
        });
        return;
    };
    
    var DepurtureShuttel_ID= req.body.departureShuttle;
    var ReturnShuttel_ID = req.body.returnShuttle;

    if (DepurtureShuttel_ID && ReturnShuttel_ID) {

        var DepurtureShuttel = [];
        var ReturnShuttel = [];

        sql.query('SELECT * FROM shuttles WHERE ID=?', DepurtureShuttel_ID, function (err, results) {
            if (err) {
                console.log("HORRAY")
                console.log(err);
            }
            if (results.length > 0) {
                for (var i = 0; i < results.length; i++) {
                    var cDepurtureShuttel = {
                        'ID': results[i].ID,
                        'from': results[i].destination,
                        'to': results[i].current_location,
                        'depurtuedate': results[i].departure_date,
                        'capacity': results[i].capacity, // todo culc function
                        'price': results[i].ticket_price,
                    }
                    DepurtureShuttel.push(cDepurtureShuttel);


                }

            }
            if (ReturnShuttel_ID) {
                sql.query('SELECT * FROM shuttles WHERE ID=?', ReturnShuttel_ID, function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    if (results.length > 0) {
                        for (var i = 0; i < results.length; i++) {
                            var cReturnShuttel = {
                                'ID': results[i].ID,
                                'from': results[i].destination,
                                'to': results[i].current_location,
                                'depurtuedate': results[i].departure_date,
                                'capacity': results[i].capacity, // todo culc function
                                'price': results[i].ticket_price,
                            }
        
                        }
                        ReturnShuttel.push(cReturnShuttel);
                        var total_price = DepurtureShuttel[0].price + ReturnShuttel[0].price;
                        res.render('PurchaseForm', { 'DepurtureShuttel': DepurtureShuttel[0].ID, 'ReturnShuttel': ReturnShuttel[0].ID, 'total_price': total_price, 'LoggedInUser': LoggedInUser});
        
                    }
                });
            } else {
                res.render('PurchaseForm', { 'DepurtureShuttel': DepurtureShuttel[0].ID, 'ReturnShuttel': ReturnShuttel[0].ID, 'total_price': total_price, 'LoggedInUser': LoggedInUser});
            }
        });

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
    var LoggedInUser = req.body.LoggedInUser;
    var DepurtureShuttel_ID = req.body.DepurtureShuttel;
    var ReturnShuttel_ID = req.body.ReturnShuttel;
    const addCredit = {
        "credit_number": req.body.ccnum,
        "exp_month": req.body.expmonth,
        "exp_year": req.body.expyear,
        "cvv": req.body.cvv,
        "email": LoggedInUser
        
    };
    sql.query('SELECT * FROM credit_cards WHERE credit_number = ? AND email =?', [addCredit.credit_number, addCredit.email], function (error, results, fields) {
        if (results.length>0) {
            console.log("credit card already in use with client" + results);

            
        } else {
            sql.query("INSERT INTO credit_cards SET ?", addCredit, (err, mysqlres) => {
                if (err) {
                    console.log("error: ", err);
                    res.status(400).send({ message: "error in creating addCredit: " + err });
                    return;
                }
                console.log("created addCredit");
                
            });

        }
        //add to passenger table the purchse
   
        var passenger1 = { 'email':LoggedInUser, 'ID':DepurtureShuttel_ID };
        var passenger2 = { 'email': LoggedInUser, 'ID':ReturnShuttel_ID };
        if (DepurtureShuttel_ID) {
            sql.query("INSERT INTO passengers SET ? ", passenger1 , (err, mysqlres) => {
                if (err) {
                    console.log("error: ", err);
                    res.status(400).send({ message: "error in creating addCredit: " + err });
                    return;
                }
                console.log("added to client purchases");
                return;
            });
        }
        //add to passenger table the purchse
        if (ReturnShuttel_ID) {
            sql.query("INSERT INTO passengers SET ? ", passenger2 , (err, mysqlres) => {
                if (err) {
                    console.log("error: ", err);
                    res.status(400).send({ message: "error in creating addCredit: " + err });
                    return;
                }
                console.log("added to client purchases");
                return;
            });
        }
       
       
    });
   
    var ClientSuttlesList = [];

    sql.query('SELECT * FROM passengers WHERE email = ?', LoggedInUser, function (req, result) {
        if (result.length > 0) {
            for (var i = 0; i < result.length; i++) {
                
                sql.query('SELECT * FROM shuttles WHERE ID = ?', result[i].ID, function (req, results) {

                    for (var j = 0; j < results.length; j++) {
                        var Shuttel = {
                            'ID': results[j].ID,
                            'from': results[j].destination,
                            'to': results[j].current_location,
                            'depurtuedate': results[j].departure_date,
                            'price': results[j].ticket_price,
                        }
                        ClientSuttlesList.push(Shuttel);
                        
                    }
                    
                });
            }
            console.log(ClientSuttlesList);
            res.render('myorders', { 'LoggedInUser': LoggedInUser, 'ClientSuttlesList': ClientSuttlesList });
        }
    });
    return;
}
 



const getTopShutteles = async function() {
    if (true) {
        const email = 'as3d@gmail.com';
        const topSearchs = await query('SELECT * FROM search_history WHERE email = ? ORDER BY search_number LIMIT 1', email);
        const trips = await query(`SELECT * FROM shuttles ORDER BY departure_date LIMIT 3`);        
        for (var i = 0; i < topSearchs.length; i++) {
            const trip = await query('SELECT * FROM shuttles WHERE destination = ? ORDER BY departure_date LIMIT 1', topSearchs[i].destination);
            if (trip.length > 0) {
                trips[i] = trip[0];
            }
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
