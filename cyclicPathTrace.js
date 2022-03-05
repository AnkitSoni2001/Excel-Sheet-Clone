// For delay and wait  
function colorPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    })
}


// If True -> cyclic,  False -> acyclic(Not cyclic)
async function isGraphCylicTrackPath(graphComponentMatrix, cycleResponse) {
    let [srcr, srcc] = cycleResponse;
    // Dependency -> visited, dfsvisited (2D array)
    let visited = [];   // Node visit trace
    let dfsVisited = [];  // Stack visit trace

    for (let i = 0; i < rows; i++) {
        let visitedRow = [];
        let dfsVisitedRow = [];
        for (let j = 0; j < cols; j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    // for (let i = 0; i < rows; i++) {
    //     for (let j = 0; j < cols; j++) {
    //         if (visited[i][j] == false) {
    //             let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
    //             // Found cycle so return immdiately, no need to explore more path

    //             if (response == true) return true;
    //         }

    //     }
    // }

    let response = await dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited);
    if (response === true) return Promise.resolve(true);

    return Promise.resolve(false);
}

// Start -> vis(TRUE) dfsVis(TRUE)
// End -> dfsVis(FALSE)
// If vis[i][j] -> already explored path, so go back, no use to explore again
// Cycle detection condition -> if(vis[i][j] == true && dfsVis[i][j] == true) -> cycle
// Return True/False 
// If True -> cyclic,  False -> acyclic(Not cyclic)


async function dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
    visited[srcr][srcc] = true;     // Start
    dfsVisited[srcr][srcc] = true;  //Start

    let cell = document.querySelector(`.cell[rid="${srcr}"][cid = "${srcc}"]`);

    cell.style.backgroundColor = "lightblue";
    await colorPromise(); // 1sec wiat

    // A1 -> [[1, 0], [0, 1], [5, 10],...] 
    for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {    //graphComponentMatrix[srcr][srcc].length is length of One Cell
        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
        if (visited[nbrr][nbrc] === false) {
            let response = await dfsCycleDetectionTracePath(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);
            if (response === true) {

                cell.style.backgroundColor = "transparent";
                await colorPromise(); // 1sec wiat
                return Promise.resolve(true);
            } // Found cycle so return immdiately, no need to explore more path
        }
        else if (visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true) {
            // Found cycle so return immdiately, no need to explore more path
            let cyclicCell = document.querySelector(`.cell[rid="${nbrr}"][cid = "${nbrc}"]`);
            
            cyclicCell.style.backgroundColor = "lightsalmon";
            await colorPromise(); // 1sec wiat
            
            cyclicCell.style.backgroundColor = "transparent";
            await colorPromise(); // 1sec wiat

            cell.style.backgroundColor = "transparent";
            await colorPromise(); // 1sec wiat

            return Promise.resolve(true);

        }
    }

    dfsVisited[srcr][srcc] = false;  // End
    return Promise.resolve(false);


}