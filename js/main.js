/*----- constants -----*/


/*----- state variables -----*/
let board; // array of 10 row arrays
let winner; // null or 1 / -1

/*----- cached elements  -----*/
let messageEl = document.getElementById('message');

/*----- classes  -----*/


/*----- event listeners -----*/


/*----- functions -----*/
init();

function generateBombs() {
    for (let i = 0; i < 10; i++) {
        let bomb = Math.floor(Math.random() * 101).toString();
        if (bomb.length > 1) {
            let bombCellIdArr = bomb.split('');
            let bombCell = document.getElementById(`r${bombCellIdArr[0]}c${bombCellIdArr[1]}`);
            if (bombCell !== 3) {
            board[`${bombCellIdArr[0]}`][`${bombCellIdArr[1]}`] = 3;
            } // figure out how to stop above loop from giving the same cell a bomb if it already has one
        } else {
            board[0][`${bomb}`] = 3;
        };
    };
};

function init() {
    board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1st/top row (left cell is r0c0)
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2nd row (from top)
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3rd row
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4th row
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5th row
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 6th row
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 7th row
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 8th row
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 9th row
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 10th row (bottom row)
    ]
    generateBombs();
    winner = null;
    render();
};

function render() {
    renderMessages();
    renderBoard();
    renderBanner();
};

function renderMessages() {
    if (winner === 1) {
        messageEl.innerHTML = 'GAME OVER - YOU WIN!'
    } else if (winner === -1) {
        messageEl.innerHTML = 'GAME OVER - YOU LOSE!'
    } else {
        messageEl.innerHTML = 'Click any square!'
    }
    document.querySelector('button').style.visibility = 'visible';
};

function renderBoard() {
    board.forEach(function(rowArr, rowIdx) {
        rowArr.forEach(function(cell, colIdx) {
            const cellId = `r${rowIdx}${colIdx}`;
            const cellEl = document.getElementById(cellId);
            if (cellEl !== 3) {
                checkNeighbors(rowIdx, colIdx);
            } else {
                if (cellEl === 3) {
                    cellEl.src = "https://i.imgur.com/8csqBHC.png";
                    cellEl.style.backgroundColor = 'red';
                    winner = -1;
                }
            }
        });
    });
};


function renderBanner() {

};

function checkNeighbors(rowIdx, colIdx) {
    let neighbor1 = document.getElementById(`r${rowIdx-1}c${colIdx-1}`);
    let neighbor2 = document.getElementById(`r${rowIdx-1}c${colIdx}`);
    let neighbor3 = document.getElementById(`r${rowIdx-1}c${colIdx+1}`);
    let neighbor4 = document.getElementById(`r${rowIdx}c${colIdx-1}`);
    let neighbor5 = document.getElementById(`r${rowIdx}c${colIdx+1}`);
    let neighbor6 = document.getElementById(`r${rowIdx+1}c${colIdx-1}`);
    let neighbor7 = document.getElementById(`r${rowIdx+1}c${colIdx}`);
    let neighbor8 = document.getElementById(`r${rowIdx+1}c${colIdx+1}`);
    let neighbors = [neighbor1, neighbor2, neighbor3, neighbor4, neighbor5, neighbor6, neighbor7, neighbor8]
    
    neighbors.forEach(function(neighbor) {
        if (neighbor) { 
            if (neighbor !== 3 && neighbor !== 1) {
                neighbor.innerHTML = `${neighbor.innerHTML} + 1`;
                neighbor.style.backgroundColor = 'white';
                let neighborID = neighbor.id.split('');
                neighbor = 1;
                checkNeighbors(neighborID[1], neighborID[3]);
            } else return;
        }
    });
}
