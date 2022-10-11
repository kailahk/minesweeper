/*----- constants -----*/


/*----- state variables -----*/
let board; // array of 10 row arrays of 10 cell objects
let winner; // null or 1 / -1
let audio; // 'on' or 'off'
let timer; // 'started' or 'notStarted'


/*----- cached elements  -----*/
let messageEl = document.getElementById('message');
let flagsNum = document.getElementById('flagsLeft');
let timeEl = document.getElementById('time');
let soundEl = document.getElementById('sound');
let boardEl = document.getElementById('board');

/*----- event listeners -----*/
boardEl.addEventListener('click', handleClick);
soundEl.addEventListener('click', handleClick);
boardEl.addEventListener('contextmenu', handleRightClick);

/*----- functions -----*/
init();

function generateBombs() {
    let count = 0;
    while (count < 10) {
        let bomb = Math.floor(Math.random() * 100).toString();
        if (bomb.length > 1) {
            let bombCellIdArr = bomb.split('');
            let bombRowIdx = parseInt(bombCellIdArr[0]);
            let bombColIdx = parseInt(bombCellIdArr[1]);
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
            let neighborRowIdx = parseInt(neighborIDArr[1]);
            let neighborColIdx = parseInt(neighborIDArr[3]);
            board[neighborRowIdx][neighborColIdx].bombsAdj++;
            } else return;
        });
    }};

function init() {
    board = [
        [{isBomb: false, bombsAdj: 0, revealed: false, flag: false},  // 1st/top row (top obj is cell r0c0)
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false, flag: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false, flag: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false, flag: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false, flag: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false, flag: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false, flag: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false, flag: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false, flag: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},],

        [{isBomb: false, bombsAdj: 0, revealed: false, flag: false}, 
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},
        {isBomb: false, bombsAdj: 0, revealed: false, flag: false},],
    ]
    generateBombs();
    board.forEach(function(rowArr, rowIdx){
        rowArr.forEach(function(cellObj, colIdx) {
            checkBombsAdj(rowIdx, colIdx);
        });
    });
    winner = null;
    audio = 'off';
    timer = 'notStarted';
    render();
};

function handleClick(event) {
    let cellId = event.target.id;
    let cellEl = document.getElementById(cellId);

    if (cellId === 'sound') {
        if (audio === 'off') {
            audio = 'on';
        } else if (audio === 'on') {
            audio = 'off';
        };
        
    } else {
        let cellIdArr = cellId.split('');
        let cellRowIdx = parseInt(cellIdArr[1]);
        let cellColIdx = parseInt(cellIdArr[3]);
        let clickedCell = board[cellRowIdx][cellColIdx];
        if (clickedCell.flag === true) return;
        if (clickedCell.isBomb === false) {
            clickedCell.revealed = true;
            checkNeighbors(cellRowIdx, cellColIdx);
        } else if (clickedCell.isBomb === true) {
                clickedCell.revealed = true;
                winner = -1;
        };

        if (timer === 'notStarted') {
        const startingMinutes = 2;
        let time = startingMinutes * 60;
            function updateTime() {
                let minutes = Math.floor(time/60);
                let seconds = time % 60;
                time--;
                timeEl.innerHTML = `${minutes}:${seconds}`;
                timer = 'started';
                if (time === -1 || winner === -1) {
                    clearInterval(clock);
                    winner = -1;
                }
            };
            let clock = setInterval(updateTime, 1000);
        };
    };

    winner = getWinner();
    render();
};

function handleRightClick(event) {
    cellId = event.target.id;
    if (event.target.id !== 'flagImg') {
        cellIdString = cellId.split('');
        cellRowIdx = parseInt(cellIdString[1]);
        cellColIdx = parseInt(cellIdString[3]);
        console.log(event.target.id);
        clickedCell = board[cellRowIdx][cellColIdx];

        if (clickedCell.flag === false) {
            clickedCell.flag = true;
            flagsNum.innerHTML--;
        }
    } else {
        let cellUnderFlagId = event.target.parentElement.id;
        cellIdString = cellUnderFlagId.split('');
        cellRowIdx = parseInt(cellIdString[1]);
        cellColIdx = parseInt(cellIdString[3]);
        clickedCell = board[cellRowIdx][cellColIdx];
        clickedCell.flag = false;
        flagsNum.innerHTML++;
    };
    render();
};

function getWinner() {

};

function render() {
    renderBoard();
    renderMessages();
    renderAudio();
};

function renderAudio() {
    if (audio === 'on') {
        soundEl.innerHTML = '<img id="sound" src="https://i.imgur.com/1Yg9GfY.png">';
        // insert audioStop() function
    } else if (audio === 'off') {
        soundEl.innerHTML = '<img id="sound" src="https://i.imgur.com/HnTMsVL.png">';
        // insert audioPlay() function
    }
};

function renderMessages() {
    if (winner === 1) {
        messageEl.innerHTML = '<h4>GAME OVER - YOU WIN!</h4>';
        messageEl.style.backgroundColor = 'green';
        messageEl.style.color = 'white';
        document.querySelector('button').style.visibility = 'visible';
    } else if (winner === -1) {
        messageEl.innerHTML = 'GAME OVER - YOU LOSE!';
        messageEl.style.backgroundColor = 'red';
        document.querySelector('button').style.visibility = 'visible';
    } else {
        messageEl.innerHTML = 'Click any square!';
    };
};

function renderBoard() {
    board.forEach(function(rowArr, rowIdx) {
        rowArr.forEach(function(cell, colIdx) {
            cellId = `r${rowIdx}c${colIdx}`;
            let currentCell = document.getElementById(cellId);
            if (board[rowIdx][colIdx].flag === true) {
                currentCell.firstChild.innerHTML = `<img id="flagImg" src="https://i.imgur.com/6fTD2xH.png">`;
            } else if (board[rowIdx][colIdx].flag === false) {
                if (currentCell.hasChildNodes) {
                    currentCell.innerHTML = `<div id="r${rowIdx}c${colIdx}"></div>`;
                };
            };
            if (board[rowIdx][colIdx].revealed === true && board[rowIdx][colIdx].isBomb === false) {
                currentCell.style.backgroundColor = 'white';
                if (board[rowIdx][colIdx].bombsAdj > 0) {
                currentCell.innerHTML = `${board[rowIdx][colIdx].bombsAdj}`;
                };
            } else if (board[rowIdx][colIdx].revealed === true && board[rowIdx][colIdx].isBomb === true) {
                currentCell.style.backgroundColor = 'red';
                currentCell.innerHTML = '<img src="https://i.imgur.com/8csqBHC.png">';
                winner = -1;
            };
        });
    });
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
            let neighborId = neighbor.id;
            let neighborIdArr = neighborId.split('');
            let neighborRowIdx = parseInt(neighborIdArr[1]);
            let neighborColIdx = parseInt(neighborIdArr[3]);
            let neighborCell = board[neighborRowIdx][neighborColIdx];
            // if the neighbor of the cell is a bomb, it will be left as is
            if (neighborCell.isBomb === false) {
                // if a neighbor of the cell clicked has bombsAdj = 0,
                // the neighbor will reveal and its neighbors willbe checked
                if (neighborCell.bombsAdj === 0 && neighborCell.revealed === false) {
                    neighborCell.revealed = true;
                    checkNeighbors(neighborRowIdx, neighborColIdx);
                    // if a neighbor of the cell clicked has bombsAdj > 0, 
                    // the neighbor will reveal but flood will stop
                } else if (neighborCell.bombsAdj > 0) { 
                    neighborCell.revealed = true;
                };
            };
        };
    });
    render();
};
