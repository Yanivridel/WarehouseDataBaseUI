//server members
const sql = require('mssql');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { log } = require('console');
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


app.use(cors());
app.use(express.json());


app.put('/api/data/items', (req, res) => {
    const code = req.body.code;
    let query = 'SELECT * FROM Items'
    query += code ? ` WHERE Code = ${code};`:';';
    sql.query(query)
    .then(result => res.json(result.recordset))
    .catch(error => {
        console.log(error);
        res.status(500).send(`Error querying the database: ${error}`);
    });
});


app.listen(port, () => {
    connectToDB();
    console.log(`The server has started listening on port ${port}...`);
});
