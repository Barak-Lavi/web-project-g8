const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const path = require('path');

//using session secret to mennage login
var session = require('express-session');
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

const CRUD_operations = require("./queries_functions/CRUD_functions.js");
//const futureShuttles = require("./queries_functions/futureShuttles.js");
const Search_operations = require("./queries_functions/search_operations.js");

app.use(bodyParser.json());
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));


// use static files located in 'public' dir
app.use(express.static('public/css'));
app.use(express.static('public/images'));
app.use(express.static('public/javascripts'));
app.use(express.static('public/videos'));

//app.use('/static', express.static(path.join(__dirname, 'public/css')));
// set port, listen for requests
app.listen(port, () => {
    console.log("Server is running on port 3000."
    );
});
//--------------------------------Routes--------------------------------------

// home route
app.get('/HomePage', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/HomePage.html'));
    if (req.session.loggedin) {
        console.log( req.session.username + ' has Loged in');
    } else {
        console.log('no user has loged in yet');
    }
});
app.get('/OurTrips', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/OurTrips.html'));
});
app.get('/MyOrders', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/MyOrders.html'));
});
app.get('/Wanted', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/Wanted.html'));
});
app.get('/AboutUs', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/AboutUs.html'));
});

app.get('/purchaseForm', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/PurchaseForm.html'));
});

app.get('/searchResult', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/SearchResult.html'));
});

// Create a new Client
app.post("/newClient", CRUD_operations.createNewClient);

//log in
app.post('/auth', CRUD_operations.LogIn);

//Search menu
app.post('/searchResult', Search_operations.searchmenu);
app.post('/purchaseForm', Search_operations.Purchaseform);
app.post('/myorders', Search_operations.MakePurchase);


//app.get('/futureShuttles', futureShuttles.getRecommanded);

