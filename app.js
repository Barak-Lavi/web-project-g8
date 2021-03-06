const express = require("express");
const app = express();
const port = 3000;
const path = require('path');

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


const CRUD_operations = require("./queries_functions/CRUD_functions.js");
//const futureShuttles = require("./queries_functions/futureShuttles.js");
const Search_operations = require("./queries_functions/search_operations.js");
const Myorders_DynamicTables = require("./queries_functions/MyOrdersDynamicTables.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

app.use(cookieParser());

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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//--------------------------------Routes--------------------------------------

// home route
app.get('/HomePage', async function (req, res) {
    const session=req.session;
    console.log(session.userid);
    const dests = await Search_operations.getTopShutteles(session.userid);
    res.render('HomePage', { dests, userEmail: session.userId }); 
});

app.get('/OurTrips', async function (req, res) {
    const session=req.session;
    console.log(session.userid);
    const trips = await Search_operations.getTrips();
    res.render('OurTrips', trips);
});

app.get('/MyOrders', async function (req, res) {
    const session = req.session;
    console.log(session.userid);
    const orders = await Myorders_DynamicTables.TablesOnload(session.userid);

    res.render('MyOrders',orders);

});
app.get('/Wanted', function (req, res) {
    const session=req.session;
    console.log(session.userid);
    res.render('Wanted');
});

app.get('/AboutUs', function (req, res) {
    const session=req.session;
    console.log(session.userid);
    res.render('AboutUs');
});

app.post('/searchResult', async function (req, res) {
    const departureShuttleList = [req.body]
    const returnShuttleList = await Search_operations.findReturnTrips(req.body.to, req.body.from, req.body.departureDate);
    departureShuttleList[0].departureDate = new Date(departureShuttleList[0].departureDate).toLocaleDateString()
    res.render('searchResult', { departureShuttleList, returnShuttleList });
});

app.get('/Layout', function (req, res) {
    res.render('Layout');
});



// Create a new Client
app.post("/newClient", CRUD_operations.createNewClient);

//log in
app.post('/auth', CRUD_operations.LogIn);

//Search menu
app.post('/purchaseForm', Search_operations.Purchaseform);
app.post('/myorders', Search_operations.MakePurchase);
app.get('/searchResult', Search_operations.searchmenu);
app.post('/wantedResult', CRUD_operations.createNewWanted);
app.post('/contactResult', CRUD_operations.createNewContact);
app.post('/deleteFlight', CRUD_operations.cancelFlight);