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

app.put('/api/data/ExOrders', (req, res) => {
    const status = req.body.status;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const orderNo = req.body.orderNo;
    console.log(status,startDate,endDate,orderNo);
    
    let query = 'SELECT e.OrderNo, e.Date, r.PaidAmt, ite.Code, ite.Quant, e.Status FROM ExOrders e JOIN Invoices inv ON (e.OrderNo=inv.OrderNo) JOIN Receipt r ON (inv.InvNo=r.InvNo) JOIN ItemsToExOrders ite ON (e.OrderNo=ite.OrderNo) JOIN Items i ON (ite.Code=i.Code) WHERE 1=1';
    query += status ? ` AND e.Status = '${status}'`:'';
    query += startDate ? ` AND e.Date > '${startDate}'`:'';
    query += endDate ? ` AND e.Date < '${endDate}'`:'';
    query += orderNo ? ` AND e.OrderNo = ${orderNo}`:'';
    query += ' ORDER BY e.OrderNo;';
    console.log(query);
    
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
