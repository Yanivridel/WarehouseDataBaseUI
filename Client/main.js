// General
const serverPath = 'http://localhost:5000';
const _mainContainer = document.getElementById("mainContainer");

//HeaderButtons
const _createOrder = document.getElementById("createOrder");
const _itemHandling = document.getElementById("itemHandling");
// Queries
const _queriesOptions = document.getElementById("queriesOptions");

const _itemsQuery = document.getElementById("itemsQuery");
const _itemsQueryInput = document.getElementById("itemsQueryInput");
const _itemsTable = document.getElementById("itemsTable");

const _ordersQuery = document.getElementById("ordersQuery");
const _regularClientsQuery = document.getElementById("regularClientsQuery");
const _accountsQuery = document.getElementById("accountsQuery");
const _unfulfilledOrdersQuery = document.getElementById("unfulfilledOrdersQuery");

function handleItemHandlingClick() {
    hideAll();
    _itemHandling.style.display = 'grid';
}

function handleQueriesClick(){
    hideAll();
    _queriesOptions.style.display = 'block';    
}

function handleItemsClick() {
    hideAll();
    _queriesOptions.style.display = 'block';
    _itemsQuery.style.display = 'grid';
}
async function handleGetItemsClick() {
    const toDelete = _itemsTable.getElementsByTagName("tr");
    for(let i = toDelete.length - 1; i > 0; i--){
        const row = toDelete[i];
        _itemsTable.removeChild(row);
    }
    
    const itemCode = _itemsQueryInput.value.trim();
    _itemsQueryInput.value = '';
    const dataArray = await getItems(parseInt(itemCode));

    if(dataArray[0]){
        for(let i = 0; i < dataArray.length; i++){
            const data = dataArray[i];
            const arr = [data.Code,data.Desc,data.Available,data.Waiting,data.Saved,data.Subscript,
                data.UnitPrice,data.Freq,data.SuppDate,data.OrderPercnt];
            const row = document.createElement('tr');
            for(let j = arr.length - 1; j >= 0; j--){
                const td = document.createElement('td');
                td.textContent = arr[j];
                row.appendChild(td);
            }
            _itemsTable.appendChild(row);
        }
    }
}
function handleOrdersClick(){
    hideAll();
    _queriesOptions.style.display = 'block';
    _ordersQuery.style.display = 'grid';
}
function handleRegularClientsClick(){
    hideAll();
    _queriesOptions.style.display = 'block';
    _regularClientsQuery.style.display = 'grid';
}
function handleAccountsClick(){
    hideAll();
    _queriesOptions.style.display = 'block';
    _accountsQuery.style.display = 'grid';
}
function handleUnfulfilledOrdersClick(){
    hideAll();
    _queriesOptions.style.display = 'block';
    _unfulfilledOrdersQuery.style.display = 'grid';
}

function hideAll(){
    const children = _mainContainer.children;
    for(const child of children){
        child.style.display = 'none';
    }
}

function getItems(itemCode){
    return fetch(`${serverPath}/api/data/items`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            code: itemCode
        })
    })
    .then(response => response.json())
    .catch(error => console.log(error));
}


function getExOrders(status, startDate, endDate, orderNo){
    return fetch(`${serverPath}/api/data/ExOrders`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            status: status,
            startDate: startDate,
            endDate: endDate,
            orderNo: orderNo
        })
    })
    .then(response => response.json())
    .catch(error => console.log(error));
}

async function handleGetExOrdersClick() {
    const data = await getExOrders('Cancelled', '2024-08-01','2024-09-01');
    console.log(data);
}

function getSubCustomerOrders(custId){
    if(isNaN(custId)) return;
    return fetch(`${serverPath}/api/data/SubCustomerOrders`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            custId: custId
        })
    })
    .then(response => response.json())
    .catch(error => console.log(error));
}

async function handleGetSubCustomerOrders() {
    const data = await getSubCustomerOrders(1);
    console.log(data);
}

function getAccountingState(date){
    return fetch(`${serverPath}/api/data/AccountingState`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            date: date
        })
    })
    .then(response => response.json())
    .catch(error => console.log(error));
}

async function handleGetAccountingState() {
    const data = await getAccountingState('2024-08-21');
    console.log(data);
}

function getUnfulfilled(date){
    return fetch(`${serverPath}/api/data/Unfulfilled`)
    .then(response => response.json())
    .catch(error => console.log(error));
}

async function handleGetUnfulfilled() {
    const data = await getUnfulfilled();
    console.log(data);
}


// handleGetItemClick();
// handleGetExOrdersClick();
// handleGetSubCustomerOrders()
// handleGetAccountingState();
// handleGetUnfulfilled()
hideAll();