const sql = require("../DB/db.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));



const TablesOnload = async function (err, res, req) {

    var LoggedInUser = (req.body.LoggedInUser || {});
    if (LoggedInUser) {
        var ClientSuttlesList_ID = [];
        //var ClientSuttlesList = [];

        await sql.query('SELECT * FROM passengers WHERE email = ?', LoggedInUser, async function (err, results) {
            if (results.length > 0) {
                for (var i = 0; i < results.length; i++) {
                    var ClientSuttles = results[i].ID;

                }
                ClientSuttlesList_ID.push(ClientSuttles);
            }
            for (var j = 0; j < ClientSuttlesList.length; j++) {
                await sql.query('SELECT * FROM shuttles WHERE ID = ?', ClientSuttlesList_ID[j], function (err, results) {
                    if (results.length > 0) {
                        for (var i = 0; i < results.length; i++) {
                            var Shuttel = {
                                'ID': results[i].ID,
                                'from': results[i].destination,
                                'to': results[i].current_location,
                                'depurtuedate': results[i].departure_date,
                                'price': results[i].ticket_price,
                            }
                            orders.push(Shuttel);
                            console.log(Shuttel);
                        }



                    }

                });

            }
            console.log(orders + 'ffff');
            return orders ;
        });
    }
    
    return;
};



module.exports = { TablesOnload };