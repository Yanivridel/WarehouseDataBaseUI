//server members
const sql = require('mssql');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const config = JSON.parse(fs.readFileSync('./config.txt', 'utf-8'));
const port = 5000;


function connectToDB() {
    try {
        sql.connect(config);
        console.log('The server connected to the DB...');
    }
    catch (error) {
        console.log(`error connecting to db:${error}`);
    }
}

// app.get('/api/data', (req, res) => {
//     sql.query('SELECT * FROM Items')
//     .then(result => res.json(result))
//     .catch(error => {
//         console.log(error);
//         res.status(500).send("duck error in the server...");
//     });
// });
app.use(cors());


app.get('/api/data/items', (req, res) => {
    sql.query('SELECT * FROM Items')
        .then(result => res.json(result.recordset)) // Use .recordset to get the data
        .catch(error => {
            console.log(error);
            res.status(500).send(`Error querying the database: ${error}`);
        });
});


app.listen(port, () => {
    connectToDB();
    console.log(`The server has started listening on port ${port}...`);
});
