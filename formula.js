for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid = "${j}"]`);
        cell.addEventListener("blur", (e) =>{
            let address = addressBar.value;
            let [activeCell, cellProp] = getCellAndCellProp(address);
            let enteredData = activeCell.innerText;

            if(enteredData === cellProp.value) return;

            cellProp.value = enteredData;

            //If data modifies remove P-C relation, formula empty, update children with new hardcoded (modified) value
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);

        })
    }
}
let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) =>{
    let inputFormula = formulaBar.value;
    if(e.key === "Enter" && inputFormula){

        // If change in formula, break old parent-Child relation, evaluate new formula, add new parent-Child relation
        let address = addressBar.value;
        let[cell, cellProp] = getCellAndCellProp(address);
        if(inputFormula !== cellProp.formula) removeChildFromParent(cellProp.formula);

        //Part of cycleValidation

        // addChildToGraphComponent(inputFormula, address);
        
        //Check formula is cyclic or not, than only evaluate
        // If True -> cyclic,  False -> acyclic(Not cyclic)

        // let isCyclic = isGraphCyclic(graphComponentMatrix);
        // if(isCyclic === true){
        //     alert("Your formula is cyclic");
        //     removeChildFromGraphComponent(inputFormula, address);
        //     return;
        // }


        let evaluatedValue = evaluateFormula(inputFormula);


        //To update UI and cellProp in DB
        setCellUIAndCellProp(evaluatedValue, inputFormula, address);

       //Parrent, Child relationship
        addChildToParent(inputFormula);   
        
        updateChildrenCells(address);
    }
})

function addChildToParent(formula){     //A1 + A2 = B2(B2 is a children of A1 & A2).
    let childAddress = addressBar.value;   // B2 ka address store hai
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >=65 && asciiValue <=90){
            let[parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }
}

function removeChildFromParent(formula){
    let childAddress = addressBar.value;   // B2 ka address store hai
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >=65 && asciiValue <=90){
            let[parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx, 1);
        }
    }
}

function updateChildrenCells(parentAddress){
    let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
    let children = parentCellProp.children;
    
    for(let i = 0; i<children.length; i++){
        let childAddress = children[i];
        let [childCell, childCellProp] = getCellAndCellProp(childAddress);
        let childFormula = childCellProp.formula;

        let evaluatedValue = evaluateFormula(childFormula);
        setCellUIAndCellProp(evaluatedValue, childFormula, childAddress);
        updateChildrenCells(childAddress);
    }
}
function evaluateFormula(formula){
    let encodedFormula = formula.split(" ");
    for(let i = 0; i<encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue, formula, address){
    // let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //UI update
    cell.innerText = evaluatedValue;
    //DB update
    cellProp.value = evaluatedValue
    cellProp.formula = formula ;
}

//Part of cycleValidation

// function addChildToGraphComponent(formula, childAddress){
//     let [crid, ccid] = decodeRIDCIDFromAddress(childAddress);
//     let encodedFormula = formula.split(" ");
//     for(let i = 0; i < encodedFormula.length; i++){
//         let asciiValue = encodedFormula[i].charCodeAt(0);
//         if(asciiValue >= 65 && asciiValue <= 90){
//             let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);

//             //B1: A1 + 10
//             // rid -> i, cid -> j
//             graphComponentMatrix[prid][pcid].push([crid, ccid]);
//         }
//     }
// }

// function removeChildFromGraphComponent(formula, childAddress){
//     let [crid, ccid] = decodeRIDCIDFromAddess(childAddress);
//     let encodedFormula = formula.split(" ");
//     for(let i = 0; i < encodedFormula.length; i++){
//         let asciiValue = encodedFormula[i].charCodeAt(0);
//         if(asciiValue >= 65 && asciiValue <= 90){
//             let [prid, pcid] = decodeRIDCIDFromAddess(encodedFormula[i]);

//             //B1: A1 + 10
//             // rid -> i, cid -> j
//             graphComponentMatrix[prid][pcid].pop();
//         }
//     }
// }