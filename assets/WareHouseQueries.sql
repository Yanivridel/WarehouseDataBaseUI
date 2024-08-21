-- QUERIES 6 --
-- 1
SELECT * FROM Items;

SELECT * FROM Items
WHERE Code = 1;

-- 2
SELECT e.OrderNo, e.Date, r.PaidAmt, ite.Code, ite.Quant, e.Status
FROM ExOrders e JOIN Invoices inv ON (e.OrderNo=inv.OrderNo)
JOIN Receipt r ON (inv.InvNo=r.InvNo)
JOIN ItemsToExOrders ite ON (e.OrderNo=ite.OrderNo)
JOIN Items i ON (ite.Code=i.Code)
---OPTIONAL----
WHERE 1=1 
AND e.Status = 'Cancelled' 
AND e.Date BETWEEN '2024-08-01' AND '2024-09-01' 
--AND e.OrderNo = 1
---------------
ORDER BY e.OrderNo;


-- 3
SELECT c.CustID, c.CustName, c.CustStatus, s.SubOrderNo,s.Freq, s.Status, i.Code
FROM Customers c JOIN Subscription s ON (c.CustID=s.CustID)
JOIN ItemsToSubscription its ON (its.SubOrderNo=s.SubOrderNo)
JOIN Items i ON (i.Code=its.Code)
---OPTIONAL----
WHERE c.CustID = 1
---------------
ORDER BY s.SubOrderNo;

-- 4
SELECT a.Date, i.SubOrderNo, i.OrderNo, a.InvNo, r.RecNo, Amount,
CASE WHEN a.CrdtDebt = 1 THEN 'credit' ELSE 'debt' END AS CrdtDebtStatus
FROM Accounting a JOIN Invoices i ON (a.InvNo=i.InvNo)
JOIN Receipt r ON (r.InvNo = i.InvNo)
---OPTIONAL---
WHERE a.Date >= '2024-08-01'
--------------
UNION ALL
SELECT NULL 'Date',NULL 'SubOrderNo',NULL 'OrderNo',NULL 'InvNo', NULL 'RecNo',
sum(amount) as 'Amount',
CASE WHEN a.CrdtDebt = 1 THEN 'Toatal credit' ELSE 'Total debt' END AS CrdtDebtStatus
FROM Accounting a JOIN Invoices i ON (a.InvNo=i.InvNo)
WHERE a.Date >= '2024-08-01'
GROUP BY a.CrdtDebt

-- 5
SELECT e.Date, e.SuppDate, i.TotAmount, e.status
FROM ExOrders e JOIN Invoices i ON (e.OrderNo=i.OrderNo)
WHERE Status IN ('Cancelled','Unfulfilled')
ORDER BY e.SuppDate;



------------------- EXTRA QURIES --------------------
SELECT * FROM Items
-- Items Handling
-- add item
INSERT INTO Items
VALUES (7,'what',12,11,20,2,3,'M3','2024-10-21',7.5)

--update item
UPDATE Items
SET Available = 15,Saved=1
WHERE code = 7;

-- delete item
DELETE FROM Items
WHERE Code = 12
