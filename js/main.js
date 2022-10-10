/*----- constants -----*/


/*----- state variables -----*/
let board; // array of 10 row arrays
let winner; // null or 1 / -1


/*----- cached elements  -----*/
let messageEl = document.getElementById('message');
let flagsNum = document.getElementById('flagsLeft');
let timeEl = document.getElementById('time');
let soundEl = document.getElementById('sound')

/*----- event listeners -----*/


/*----- functions -----*/
init();

function generateBombs() {
    let count = 0;
    while (count < 10) {
        let bomb = Math.floor(Math.random() * 100).toString();
        if (bomb.length > 1) {
            let bombCellIdArr = bomb.split('');
            let bombRowIdx = bombCellIdArr[0];
            let bombColIdx = bombCellIdArr[1];
            if (board[bombRowIdx][bombColIdx].isBomb === false) {
            board[bombRowIdx][bombColIdx].isBomb = true;
            count++;
            }
        } else {
            board[0][bomb].isBomb = true;
            count++;
        };
    };
};

function checkBombsAdj(rowIdx, colIdx) {
    if (board[rowIdx][colIdx].isBomb === true) {
    let neighbor1 = document.getElementById(`r${rowIdx-1}c${colIdx-1}`);
    let neighbor2 = document.getElementById(`r${rowIdx-1}c${colIdx}`);
    let neighbor3 = document.getElementById(`r${rowIdx-1}c${colIdx+1}`);
    let neighbor4 = document.getElementById(`r${rowIdx}c${colIdx-1}`);
    let neighbor5 = document.getElementById(`r${rowIdx}c${colIdx+1}`);
    let neighbor6 = document.getElementById(`r${rowIdx+1}c${colIdx-1}`);
    let neighbor7 = document.getElementById(`r${rowIdx+1}c${colIdx}`);
    let neighbor8 = document.getElementById(`r${rowIdx+1}c${colIdx+1}`);

    let neighbors = [neighbor1, neighbor2, neighbor3, neighbor4, neighbor5, neighbor6, neighbor7, neighbor8];

    neighbors.forEach(function(neighbor) {
        if (neighbor) {
            let neighborID = neighbor.id;
            let neighborIDArr = neighborID.split('');
            let neighborRowIdx = neighborIDArr[1]
            let neighborColIdx = neighborIDArr[3];
            board[neighborRowIdx][neighborColIdx].bombsAdj++;
            } else return;
        });
    }};



function init() {
    board = [
        [{isBomb: false, bombsAdj: 0, revealed: false},  // 1st/top row (top obj is cell r0c0)
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},
        {isBomb: false, bombsAdj: 0, revealed: false},],
    ]
    generateBombs();
    board.forEach(function(rowArr, rowIdx){
        rowArr.forEach(function(cellObj, colIdx) {
            checkBombsAdj(rowIdx, colIdx);
        });
    });
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
        messageEl.innerHTML = 'GAME OVER - YOU WIN!';
        messageEl.style.backgroundColor = 'green';
        messageEl.style.color = 'white';
        document.querySelector('button').style.visibility = 'visible';
    } else if (winner === -1) {
        messageEl.innerHTML = 'GAME OVER - YOU LOSE!';
        messageEl.style.backgroundColor = 'red';
        document.querySelector('button').style.visibility = 'visible';
    } else {
        messageEl.innerHTML = 'Click any square!';
    }
};

function renderBoard() {
    board.forEach(function(rowArr, rowIdx) {
        rowArr.forEach(function(cell, colIdx) {
            let cellId = `r${rowIdx}c${colIdx}`;
            let cellEl = document.getElementById(cellId);
            if (board[rowIdx][colIdx].isBomb === false) {
                checkNeighbors(rowIdx, colIdx);
            } else {
                if (board[rowIdx][colIdx].isBomb === true)
                    cellEl.src = "https://i.imgur.com/8csqBHC.png";
                    cellEl.style.backgroundColor = 'red';
                    winner = -1;
                }
            }
        );
    })
};


function renderBanner() {
    const startingMinutes = 5;
    let time = startingMinutes * 60;
    function updateTime() {
        let minutes = Math.floor(time/60);
        let seconds = time % 60;
        timeEl.innerHTML = `${minutes}:${seconds}`
        time--;
    }
    setInterval(updateTime, 1000);
    flagsNum.innerHTML--;
    soundEl.src = 'https://i.imgur.com/1Yg9GfY.png';
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

    let neighbors = [neighbor1, neighbor2, neighbor3, neighbor4, neighbor5, neighbor6, neighbor7, neighbor8];

    neighbors.forEach(function(neighbor) {
        if (neighbor) { 
            let neighborID = neighbor.id;
            let neighborIDArr = neighborID.split('');
            let neighborRowIdx = neighborIDArr[1]
            let neighborColIdx = neighborIDArr[3];
            let neighborCell = board[neighborRowIdx][neighborColIdx];
            // if one of the neighbors of the cell clicked has a bombAdj > 0, the neighbor will reveal but flood will stop
            if (neighborCell.bombsAdj > 0 && neighborCell.revealed === false && neighborCell.isBomb === false) { 
                neighborCell.revealed = true;
                neighbor.innerHTML = neighborCell.bombsAdj;
                neighbor.style.backgroundColor = 'white';
            } else if (neighborCell.bombsAdj === 0 && neighborCell.isBomb === false) {
                neighborCell.revealed = true;
                neighbor.style.backgroundColor = 'white';
                checkNeighbors(neighborRowIdx, neighborColIdx);
            } else return;
        };
    
    });
};
