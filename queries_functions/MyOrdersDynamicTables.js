const sql = require("../DB/db.js");
const util = require("util");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const query = util.promisify(sql.query).bind(sql);

app.use(bodyParser.json());
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));



const TablesOnload = async function (email) {
    let orders = [];
    let Shuttel;
    if (email) {
        const shuttles = await query('SELECT * FROM shuttles as s join passengers as p on s.ID=p.ID WHERE p.email = ? group by s.ID order by 4', email);
        if (shuttles.length > 0) {
            for (var j = 0; j < shuttles.length; j++) {
                 Shuttel = {
                     'ID': shuttles[j].ID,
                     'from': shuttles[j].destination,
                     'to': shuttles[j].current_location,
                     'depurtuedate': new Date(shuttles[j].departure_date).toLocaleDateString(),
                     'price': shuttles[j].ticket_price,
                 }
                 orders.push(Shuttel);
            }
            return { Shuttel, orders };;
        }
    } 
    return { Shuttel, orders };
};

module.exports = { TablesOnload };