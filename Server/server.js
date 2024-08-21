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

    let query = 'SELECT e.OrderNo, e.Date, r.PaidAmt, ite.Code, ite.Quant, e.Status FROM ExOrders e JOIN Invoices inv ON (e.OrderNo=inv.OrderNo) JOIN Receipt r ON (inv.InvNo=r.InvNo) JOIN ItemsToExOrders ite ON (e.OrderNo=ite.OrderNo) JOIN Items i ON (ite.Code=i.Code) WHERE 1=1';
    query += status ? ` AND e.Status = '${status}'`:'';
    query += startDate ? ` AND e.Date >= '${startDate}'`:'';
    query += endDate ? ` AND e.Date <= '${endDate}'`:'';
    query += orderNo ? ` AND e.OrderNo = ${orderNo}`:'';
    query += ' ORDER BY e.OrderNo;';

    sql.query(query)
    .then(result => res.json(result.recordset))
    .catch(error => {
        console.log(error);
        res.status(500).send(`Error querying the database: ${error}`);
    });
});

app.put('/api/data/SubCustomerOrders', (req, res) => {
    const custId = req.body.custId;
    
    let query = `SELECT c.CustID, c.CustName, c.CustStatus, s.SubOrderNo,s.Freq, s.Status, i.Code FROM Customers c JOIN Subscription s ON (c.CustID=s.CustID) JOIN ItemsToSubscription its ON (its.SubOrderNo=s.SubOrderNo) JOIN Items i ON (i.Code=its.Code) WHERE c.CustID = ${custId} ORDER BY s.SubOrderNo;`;
    
    sql.query(query)
    .then(result => res.json(result.recordset))
    .catch(error => {
        console.log(error);
        res.status(500).send(`Error querying the database: ${error}`);
    });
});

app.put('/api/data/AccountingState', (req, res) => {
    const date = req.body.date;
    
    let query = `SELECT a.Date, i.SubOrderNo, i.OrderNo, a.InvNo, r.RecNo, Amount,
CASE WHEN a.CrdtDebt = 1 THEN 'credit' ELSE 'debt' END AS CrdtDebtStatus
FROM Accounting a JOIN Invoices i ON (a.InvNo=i.InvNo)
JOIN Receipt r ON (r.InvNo = i.InvNo)
WHERE a.Date >= '${date}'
UNION ALL
SELECT NULL 'Date',NULL 'SubOrderNo',NULL 'OrderNo',NULL 'InvNo', NULL 'RecNo',
sum(amount) as 'Amount',
CASE WHEN a.CrdtDebt = 1 THEN 'Toatal credit' ELSE 'Total debt' END AS CrdtDebtStatus
FROM Accounting a JOIN Invoices i ON (a.InvNo=i.InvNo)
WHERE a.Date >= '${date}'
GROUP BY a.CrdtDebt`

    sql.query(query)
    .then(result => res.json(result.recordset))
    .catch(error => {
        console.log(error);
        res.status(500).send(`Error querying the database: ${error}`);
    });
});

app.get('/api/data/Unfulfilled', (req, res) => {
    sql.query(`SELECT e.Date, e.SuppDate, i.TotAmount, e.status
        FROM ExOrders e JOIN Invoices i ON (e.OrderNo=i.OrderNo)
        WHERE Status IN ('Cancelled','Unfulfilled')
        ORDER BY e.SuppDate;`)
    .then(result => res.json(result.recordset))
    .catch(error => {
        console.log(error);
        res.status(500).send(`Error querying the database: ${error}`);
    });
});

app.put('/api/data/ItemHandlingExecute', (req, res) => {
    const inputs = req.body;
    let query = '';
    
    if(inputs.type === "add"){
        query+= `INSERT INTO Items VALUES (${inputs.Code},'${inputs.Desc}',${inputs.UnitPrice},${inputs.Available},
    ${inputs.Waiting},${inputs.Saved},${inputs.Subscript},'${inputs.Freq}','${inputs.SuppDate}',${inputs.OrderPercnt});`
    }
    else if(inputs.type === "update"){
        const setClause  = [];
        for(const [key,value] of Object.entries(inputs)){
            if(value && !['Code','type'].includes(key)){
                if(['Desc','Freq','SuppDate'].includes(key))
                    setClause.push(`[${key}] = '${value}'`);
                else
                setClause.push(`[${key}] = ${value}`);
            }
        }
        query+= `UPDATE Items SET ${setClause.join(",")} WHERE Code = ${inputs.Code};`;
    }
    else if(!inputs.Waiting && !inputs.Saved && !inputs.Subscript){ //delete
        query+= `DELETE FROM Items WHERE Code = ${inputs.Code};`;
    }
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
