/*----- constants -----*/
const music = new Audio("Sound/231578__lemoncreme__floating-synth-melody-at-130-bpm-c-major-loop-music (1).mp3");
music.loop = true;

/*----- state variables -----*/
let board; 
let winner; 
let audio; 
let timer; 
let mCount;


/*----- cached elements  -----*/
const messageEl = document.getElementById('message');
const flagsNum = document.getElementById('flagsLeft');
const timeEl = document.getElementById('time');
const soundEl = document.getElementById('sound');
const boardEl = document.getElementById('board');
const buttonEl = document.querySelector('button');

/*----- event listeners -----*/
boardEl.addEventListener('click', handleClick);
soundEl.addEventListener('click', handleClick);
boardEl.addEventListener('contextmenu', handleRightClick);
buttonEl.addEventListener('click', init);

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
            if (board[0][parseInt(bomb)].isBomb === false) {
                board[0][parseInt(bomb)].isBomb = true;
                count++;
            };
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
    };
};

function init() {
    board = [
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
    timeEl.innerHTML = '2:00'
    mCount = 0;
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
        if (timeEl.innerHTML === '0:0') return;
        if (cellEl.style.backgroundColor !== 'white' && winner !== true && winner !== false) {
            if (clickedCell.flag === true) return;
            if (clickedCell.isBomb === false) {
                clickedCell.revealed = true;
                checkNeighbors(cellRowIdx, cellColIdx);
            } else if (clickedCell.isBomb === true) {
                clickedCell.revealed = true;
                winner = false;
            };
        };
        if (timer === 'notStarted') {
            resetTimer();
        };
    };
    winner = getWinner();
    render();
};

function handleRightClick(event) {
    event.preventDefault();
    cellId = event.target.id;
    cellEl = document.getElementById(cellId);
    if (event.target.id !== 'flagImg') {
        cellIdString = cellId.split('');
        cellRowIdx = parseInt(cellIdString[1]);
        cellColIdx = parseInt(cellIdString[3]);
        clickedCell = board[cellRowIdx][cellColIdx];
        if (clickedCell.flag === false 
            && flagsNum.innerHTML > 0 
            && cellEl.style.backgroundColor !== 'white') {
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
    if (clickedCell.flag === true && clickedCell.isBomb === true) {
        mCount++;
    } else if (clickedCell.flag === false) {
        mCount--;
    }
    winner = getWinner();
    render();
};

function getWinner() {
    let mineCount = 0;
    board.forEach(function(rowArr, rowIdx) {
        rowArr.forEach(function(cell, colIdx) {
            cellId = `r${rowIdx}c${colIdx}`;
            currentCell = document.getElementById(cellId);
            if (board[rowIdx][colIdx].isBomb === true 
                && board[rowIdx][colIdx].flag === true) {
                mineCount++
            };
        });
    });
    if (mineCount === 10 || mCount === 10) {
        return true;
    };
};

function render() {
    renderAudio();
    renderBoard();
    renderMessages();
};

function renderAudio() {
    if (audio === 'on') {
        soundEl.innerHTML = '<img id="sound" src="https://i.imgur.com/1Yg9GfY.png">';
        music.play();
    } else if (audio === 'off') {
        soundEl.innerHTML = '<img id="sound" src="https://i.imgur.com/HnTMsVL.png">';
        music.pause();
    }
};

function renderMessages() {
    if (winner === true) {
        messageEl.innerHTML = 'GAME OVER - YOU WIN!';
        messageEl.style.backgroundColor = '#53917E';
        messageEl.style.color = 'white';
        buttonEl.style.visibility = 'visible';
        flagsNum.innerHTML = '10';
    } else if (winner === false) {
        messageEl.innerHTML = 'GAME OVER - YOU LOSE!';
        messageEl.style.backgroundColor = '#CC444B';
        messageEl.style.color = 'black';
        buttonEl.style.visibility = 'visible';
        flagsNum.innerHTML = '10';
    } else {
        messageEl.innerHTML = 'Click any square!';
        messageEl.style.backgroundColor = '#F1E8E4';
        messageEl.style.color = '#6D597A';
        buttonEl.style.visibility = 'hidden';
    };
};

function resetTimer() {
    const startingMinutes = 2;
    let time = startingMinutes * 60;
    function updateTime() {
        let minutes = Math.floor(time/60);
        let seconds = time % 60;
        time--;
        timeEl.innerHTML = `${minutes}:${seconds}`;
        timer = 'started';
        if (time === -1 || winner === false || winner === true) {
            clearInterval(clock);
            if (time === -1) {
                winner = false;
                showBombs();
            }
            renderMessages();
        };
    };
    let clock = setInterval(updateTime, 1000);
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
            if (board[rowIdx][colIdx].revealed === true && board[rowIdx][colIdx].isBomb === false && board[rowIdx][colIdx].flag === false) {
                currentCell.style.backgroundColor = 'white';
                if (board[rowIdx][colIdx].bombsAdj > 0) {
                    currentCell.innerHTML = `${board[rowIdx][colIdx].bombsAdj}`;
                    currentCell.style.color = '#6D597A';
                    currentCell.style.fontSize = '3vmin';
                };
            } else if (board[rowIdx][colIdx].revealed === true && board[rowIdx][colIdx].isBomb === true) {
                winner = false;
                showBombs();
            };
            if (board[rowIdx][colIdx].revealed === false && board[rowIdx][colIdx].flag === false) {
                currentCell.style.backgroundColor = '#D5C3D5';
                
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
            if (neighborCell.isBomb === false) {
                if (neighborCell.bombsAdj === 0 && neighborCell.revealed === false) {
                    neighborCell.revealed = true;
                    checkNeighbors(neighborRowIdx, neighborColIdx);
                } else if (neighborCell.bombsAdj > 0) { 
                    neighborCell.revealed = true;
                };
            };
        };
    });
    render();
};

function showBombs() {
    board.forEach(function(rowArr, rowIdx) {
        rowArr.forEach(function(cell, colIdx) {
            cellId = `r${rowIdx}c${colIdx}`;
            let currentCell = document.getElementById(cellId)
            if (board[rowIdx][colIdx].isBomb === true) {
                currentCell.style.backgroundColor = '#CC444B';
                currentCell.innerHTML = '<img src="https://i.imgur.com/eTBdjcY.png">';
            };
        });
    });
};