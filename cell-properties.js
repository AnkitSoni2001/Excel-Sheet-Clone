let sheetDB = [];

for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < cols; j++) {
        let cellProp = {
            blod: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            BGcolor: "#000000", //Just for indication purpose
            value:"",
            formula: "",
            children:[],
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}

//Selectors for cell properties
let fontFamily = document.querySelector(".font-family-prop");
let fontSize = document.querySelector(".font-size-prop");
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underlined");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");




let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

//Attach properties listener
//Application of two-way-binding

bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);  //Geting active cell

    //Modification
    cellProp.bold = !cellProp.bold;  //Data Change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; //UI change(1) (cell ka element bold hogayega)
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;   //UI change(2)  icon become bold

})

function getCellAndCellProp(address) {
    let [rid, cid] = decodeRIDCIDFromAddess(address);
    //Access cell & storage object
    let cell = document.querySelector(`.cell[rid = "${rid}"][cid ="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}


function decodeRIDCIDFromAddess(address) {
    // decoding address "A1" to row & col  value like [1][3] for storage
    let rid = Number(address.slice(1) - 1); //"1" -> 0
    let cid = Number(address.charCodeAt(0)) - 65; // "A" -> 65
    return [rid, cid];
}

italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);  //Geting active cell

    //Modification
    cellProp.italic = !cellProp.italic;  //DataBase Change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; //UI change(1) (cell ka element bold hogayega)
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;   //UI change(2)  icon become bold

})

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);  //Geting active cell

    //Modification
    cellProp.underline = !cellProp.underline;  //DataBase Change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; //UI change(1) (cell ka element bold hogayega)
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;   //UI change(2)  icon become bold

})

fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);  //Geting active cell
    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})

fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);  //Geting active cell
    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})
fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);  //Geting active cell
    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})
BGcolor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);  //Geting active cell
    cellProp.BGcolor = BGcolor.value;
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;
})


//Alignment
alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);  //Geting active cell
        let alignValue = e.target.classList[0];
        cellProp.alignElem = alignValue; //Data Change
        cell.style.textAlign = cellProp.alignElem; //UI change (1)

        switch (alignValue) {   //UI Change(2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;

        }
    })
})
let allCells = document.querySelectorAll(".cell");
for (let i = 0; i < allCells.length; i++) {
    addEventListenerToAttachCellProperties(allCells[i]);
}

function addEventListenerToAttachCellProperties(cell) {
    // Work 
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rid, cid] = decodeRIDCIDFromAddess(address);
        let cellProp = sheetDB[rid][cid];

        //Apply cell Properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignElem;



        //Apply Properties UI props container
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        BGcolor.value = cellProp.BGcolor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;

        fontColor.value = cellProp.fontColor;


        switch (cellProp.alignment) {   //UI Change(2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;

        }
        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.value = cellProp.value;

    })
}


