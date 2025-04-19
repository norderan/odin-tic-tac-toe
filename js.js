/*
---Project steps:
    - Get working no fancy ui.
    - add ui



    - add fancy ui











*/




const html = {
    cells: document.querySelectorAll(".cell"),
    gameboardDiv: document.getElementById("gameboard"),
    changeForX: document.getElementById("change-for-x"),
    changeForO: document.getElementById("change-for-o"),
    changeForComputer: document.getElementById("change-for-computer"),
    changeForPlayer: document.getElementById("change-for-player"),
    status: document.getElementById("status"),
    startAgain: document.getElementById("start-again")
}


//factory for players
const Player = function (mark) {
    this.mark = mark;
} 


//factory for gameboards
function GameBoard(){
    let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    
    const addMark = (mark, location) => {
        if(gameBoard[location] !== " "){
            return false;
        } else {
            gameBoard[location] = mark;
            return true;
        }
    }

    const checkForWin = (mark) => {
        return (
          // rows
          gameBoard[0] === mark && gameBoard[1] === mark && gameBoard[2] === mark ||
          gameBoard[3] === mark && gameBoard[4] === mark && gameBoard[5] === mark ||
          gameBoard[6] === mark && gameBoard[7] === mark && gameBoard[8] === mark ||
          // columns
          gameBoard[0] === mark && gameBoard[3] === mark && gameBoard[6] === mark ||
          gameBoard[1] === mark && gameBoard[4] === mark && gameBoard[7] === mark ||
          gameBoard[2] === mark && gameBoard[5] === mark && gameBoard[8] === mark ||
          // diagonals
          gameBoard[0] === mark && gameBoard[4] === mark && gameBoard[8] === mark ||
          gameBoard[2] === mark && gameBoard[4] === mark && gameBoard[6] === mark
        );
      };

    const checkForTie = () => gameBoard.every(element => element !== " ");      

    const logBoard = () => {
        for(let i = 0; i < 9; i= i+3){
            console.log(`${gameBoard[i]}|${gameBoard[i+1]}|${gameBoard[i+2]} `)
        }
    }

    function reset() {
        gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    };
    return {addMark, checkForWin, logBoard,reset, checkForTie}
}


function GameFlow() {
    const board = GameBoard();
    let playerTurnDecider = 0;

    const addTurn = (location) => {
        if(playerTurnDecider % 2 == 0){
            if(board.addMark("X",location)){
                playerTurnDecider++;
                return true;
            } else return false;
        } else {
            if(board.addMark("O",location)){
                playerTurnDecider++;
                return true;
            } else return false;
            
        }
    }

    function getTurn() {
        if(playerTurnDecider % 2 != 0) return "X";
        else return "O";
    }

    const reset = () => {
        console.log("[*] reset intionated");
        html.status.textContent = `###`;
        allowPlayingFlag = true;
        playerTurnDecider = 0;
        board.reset()
        html.cells.forEach(cell =>  {
            const h1 = cell.querySelector("h1");
            if (h1) {
                h1.textContent = " "; 
            }
        });
    }

    const changeStartMark = (mark) => {
        if (playerTurnDecider == 1 && mark === "X") playerTurnDecider--;
        if (playerTurnDecider == 0 && mark === "O") playerTurnDecider++;
    }

    return {addTurn: addTurn,logBoard: board.logBoard,getTurn: getTurn, checkForWin: board.checkForWin,reset: reset, changeStartMark: changeStartMark , checkForTie: board.checkForTie};
}   



//gameflow
const gameFlow = GameFlow();

let allowPlayingFlag = true;
//game life cycle
html.cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if(gameFlow.addTurn(cell.dataset.id) && allowPlayingFlag){
            const markInHtml = cell.querySelector("h1");
            markInHtml.textContent = gameFlow.getTurn();
            cell.appendChild(markInHtml);
            gameFlow.logBoard();
            console.log(gameFlow.checkForWin(gameFlow.getTurn()));
            if(gameFlow.checkForWin(gameFlow.getTurn())){
                console.log(`"${gameFlow.getTurn()}" have one!`);
                allowPlayingFlag = false;
                html.status.textContent = `"${gameFlow.getTurn()}" WON`;
            }
            if(gameFlow.checkForTie()){
                html.status.textContent = `TIE`; 
            }
        }
    });
});

//---Buttons:

//reset:
html.startAgain.addEventListener('click', () => gameFlow.reset());

//change start symbol:
html.changeForX.addEventListener('click', () => gameFlow.changeStartMark("X"));
html.changeForO.addEventListener('click', () => gameFlow.changeStartMark("O"));

