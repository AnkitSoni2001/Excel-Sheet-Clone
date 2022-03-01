let  rows= 100;
let cols = 26;  //Because no. of alphabet 26 hote hai

let addressBar = document.querySelector(".address-bar");

//Numbering(address) from 1 to 100 in 1st column 
let addressColCont = document.querySelector(".address-col-cont"); 
for(let i = 0; i < rows ; i++){
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol);
}

//Numbering(address) from A to Z in first row
let addressRowCont = document.querySelector(".address-row-cont");  
for (let i = 0; i < cols; i++){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText =String.fromCharCode(65+i);
    addressRowCont.appendChild(addressRow);
}

// Cereating all cells
let cellsCont = document.querySelector(".cells-cont");
for(let i = 0; i< rows ;i++){
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class","row-cont");
    for (let j=0; j < cols; j++){
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");

        cell.setAttribute("contenteditable","true")

        //Attribute for cell and storage identification
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);

        rowCont.appendChild(cell);

        // Function for Displaying row & col in ADDRESS-BAR
        addListenerForAddressBarDisplay(cell, i, j);
    }
    cellsCont.appendChild(rowCont);
}

// Function for Displaying row & col in ADDRESS-BAR
function addListenerForAddressBarDisplay(cell, i, j){
    cell.addEventListener("click", (e) =>{
        let rowID = i+1;
        let colID = String.fromCharCode(65+j);
        addressBar.value = `${colID}${rowID}`;
    })
}

//By default clicked on first cell via DOM

let firstCell = document.querySelector(".cell");
firstCell.click();
