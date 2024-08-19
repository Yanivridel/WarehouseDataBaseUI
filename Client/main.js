// General
const serverPath = 'http://localhost:5000';
const _createOrder = document.getElementById("createOrder");
const _mainContainer = document.getElementById("mainContainer");
const _queriesOptions = document.getElementById("queriesOptions");

function handleQueriesClick(){
    hideAll();
    _queriesOptions.style.display = 'block';    
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
    //.then(data => console.log(data))
    .catch(error => console.log(error));
}


handleGetItemClick();
hideAll();