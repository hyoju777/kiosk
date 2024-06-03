const BREADOBJ_KEY = "breadObj";
let bName = "🍞", bCount = 1, bPrice = 0;

function count(type)  {
    const resultElement = document.getElementById('result');
    
    let number = resultElement.innerText;
    
    if(type === 'plus') {
        number = parseInt(number) + 1;
    }else if(type === 'minus')  {
        number = parseInt(number) - 1;
    }
    
    resultElement.innerText = number;
    bCount = number;
    bName = opener.document.getElementById("label-container").childNodes[0].innerText;
    bPrice = parseInt(opener.document.getElementById("label-container").childNodes[1].innerText);
    bPrice = number * bPrice; // 빵 가격 불러오기
}

function addBreadObj() {
    const newBreadObj = {
        name: bName,
        id: Date.now(),
        count: bCount,
        price: bPrice,
    }

    var existingBreads = JSON.parse(localStorage.getItem("breads"));
    if(existingBreads == null) {
        existingBreads = [];
    }
    existingBreads.push(newBreadObj);
    localStorage.setItem("breads", JSON.stringify(existingBreads));
    
    // 테스트용
    console.log(existingBreads);
    console.log(newBreadObj);
    
    window.close();
}
