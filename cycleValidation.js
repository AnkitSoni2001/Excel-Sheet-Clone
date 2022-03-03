//Stroge -> 2D array (Basic needed)
let graphComponentMatrix = []; // It is use to represent a SINGLE CELL

for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
        //Why array? ->Because More than 1 child relation(dependency)
        row.push([]);
    }
    graphComponentMatrix.push(row);
}

// If True -> cyclic,  False -> acyclic(Not cyclic)
function isGraphCyclic(graphComponentMatrix) {
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

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (visited[i][j] == false) {
                let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
                // Found cycle so return immdiately, no need to explore more path

                if (response == true) return true;
            }

        }
    }
    return false;
}

// Start -> vis(TRUE) dfsVis(TRUE)
// End -> dfsVis(FALSE)
// If vis[i][j] -> already explored path, so go back, no use to explore again
// Cycle detection condition -> if(vis[i][j] == true && dfsVis[i][j] == true) -> cycle
// Return True/False 
// If True -> cyclic,  False -> acyclic(Not cyclic)

function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
    visited[srcr][srcc] = true;     // Start
    dfsVisited[srcr][srcc] = true;  //Start

    // A1 -> [[1, 0], [0, 1], [5, 10],...] 
    for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {    //graphComponentMatrix[srcr][srcc].length is length of One Cell
        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
        if (visited[ndrr][nbrc] === false) {
            let response = dfsCycleDetection(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);
            if (response === true) return true; // Found cycle so return immdiately, no need to explore more path
        }
        else if (visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true) {
            // Found cycle so return immdiately, no need to explore more path
            return true;
        }
    }

    dfsVisited[srcr][srcc] = false;  // End
    return false;

}