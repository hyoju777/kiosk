const breadTable = document.querySelector('#bread-table');
const breadTotalPrice = document.querySelector('#total-price');

let breadArr = [];
let totalPrice = 0;
const BREADS_KEY = "breads";

// 데이터 불러오기
function loadBreadTable() {
    //let totalPrice = 0;
    var existingBreads = JSON.parse(localStorage.getItem("breads"));
    if(existingBreads == null) {
        existingBreads = [];
    }
    breadArr = existingBreads;
    breadArr.map(bread => showBreadTable(bread)); 
    showTotalPrice(breadArr);
}

function showTotalPrice(breadArr) {
    breadArr.map(bread => totalPrice += bread.price); 
    
    breadTotalPrice.innerText = "총합 " + totalPrice + "원";
}

function showBreadTable(breadObj) {
    const row = document.createElement("tr");
    row.id = breadObj.id;

    const breadName = document.createElement("td");
    const breadCount = document.createElement("td");
    const breadPrice = document.createElement("td");
    const breadDelete = document.createElement("td");
    const deleteBtn = document.createElement("button");

    breadName.innerText = breadObj.name;
    breadCount.innerText = breadObj.count;
    breadPrice.innerText = breadObj.price;
    deleteBtn.innerText = "🗑";
    deleteBtn.addEventListener("click", deleteList);

    row.appendChild(breadName);
    row.appendChild(breadCount);
    row.appendChild(breadPrice);
    breadDelete.appendChild(deleteBtn);
    row.appendChild(breadDelete);
    breadTable.appendChild(row);
};

function deleteList(event) {
    const breadDelete = event.target.parentElement; // btn의 부모(li)
    const breadRow = breadDelete.parentElement; 
    breadRow.remove();
    
    breadArr = breadArr.filter((bread) => bread.id != parseInt(breadRow.id));
    saveBreadArr();
}

function saveBreadArr() {
    localStorage.setItem(BREADS_KEY, JSON.stringify(breadArr));
}

const saved = localStorage.getItem(BREADS_KEY);
if (saved) {
    const parsed = JSON.parse(saved);
    showTotalPrice(parsed);
    parsed.forEach(showBreadTable);
}