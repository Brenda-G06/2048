var quad;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {


    quad = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = quad[r][c];
            updateTile(tile, num);
            document.getElementById("quad").append(tile);
        }
    }
    
    setTwo();
    setTwo();

}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; 
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }                
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();

    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})

function filterZero(row){
    return row.filter(num => num != 0); 
}

function slide(row) {
    
    row = filterZero(row); 
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } 
    row = filterZero(row); 
    
    while (row.length < columns) {
        row.push(0);
    } 
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = quad[r];
        row = slide(row);
        quad[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = quad[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = quad[r];         
        row.reverse();              
        row = slide(row)            
        quad[r] = row.reverse();  
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = quad[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [quad[0][c], quad[1][c], quad[2][c], quad[3][c]];
        row = slide(row);
        
        for (let r = 0; r < rows; r++){
            quad[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = quad[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [quad[0][c], quad[1][c], quad[2][c], quad[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
       
        for (let r = 0; r < rows; r++){
            quad[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = quad[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (quad[r][c] == 0) {
            quad[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (quad[r][c] == 0) { 
                return true;
            }
        }
    }
    return false;
}