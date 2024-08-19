// General
const serverPath = 'http://localhost:5000';
const _createOrder = document.getElementById("createOrder");
const _mainContainer = document.getElementById("mainContainer");

// Queries
const _queriesOptions = document.getElementById("queriesOptions");
const _itemsQuery = document.getElementById("itemsQuery");
const _itemsQueryInput = document.getElementById("itemsQueryInput")
const _ordersQuery = document.getElementById("ordersQuery");
const _regularClientsQuery = document.getElementById("regularClientsQuery");
const _accountsQuery = document.getElementById("accountsQuery");
const _unfulfilledOrdersQuery = document.getElementById("unfulfilledOrdersQuery");

function handleQueriesClick(){
    hideAll();
    _queriesOptions.style.display = 'block';    
}

function handleItemsClick() {
    hideAll();
    _queriesOptions.style.display = 'block';
    _itemsQuery.style.display = 'block';
}
function handleItemsQueryInputClick(){
    const itemCode = _itemsQueryInput.value.trim();
    _itemsQueryInput.value = '';
    console.log(itemCode);
}

function handleOrdersClick(){
    hideAll();
    _queriesOptions.style.display = 'block';
    _ordersQuery.style.display = 'block';
}
function handleRegularClientsClick(){
    hideAll();
    _queriesOptions.style.display = 'block';
    _regularClientsQuery.style.display = 'block';
}
function handleAccountsClick(){
    hideAll();
    _queriesOptions.style.display = 'block';
    _accountsQuery.style.display = 'block';
}
function handleUnfulfilledOrdersClick(){
    hideAll();
    _queriesOptions.style.display = 'block';
    _unfulfilledOrdersQuery.style.display = 'block';
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

async function handleGetItemsClick() {
    const data = await getItems(2);
    console.log(data);
}

function GetExOrders(status, startDate, endDate, orderNo){
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
    const data = await GetExOrders('Cancelled', '2024-08-01','2024-09-01');
    console.log(data);
}

// handleGetItemClick();
// handleGetExOrdersClick();
hideAll();