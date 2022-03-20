let sheetsFolderCont = document.querySelector(".sheets-folder-cont");
let addSheetBtn = document.querySelector(".sheet-add-icon");
addSheetBtn.addEventListener("click", (e) => {
    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder");

    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFolders.length);
    sheet.innerHTML = `
        <div class="sheet-content">Sheet ${allSheetFolders.length +1}</div>
    `;
    console.log(sheet.innerHTML);
    sheetsFolderCont.appendChild(sheet);
})



