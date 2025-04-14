
const html = {
    cells: document.querySelectorAll(".cell")
}


//factory for player
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
      

    const logBoard = () => {
        for(let i = 0; i < 9; i= i+3){
            console.log(`${gameBoard[i]}|${gameBoard[i+1]}|${gameBoard[i+2]} `)
        }
    }
    return {addMark, checkForWin, logBoard}
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

    return {addTurn: addTurn,logBoard: board.logBoard};
}   


const gameFlow = GameFlow();
html.cells.forEach(cell => {
    cell.addEventListener('click', () => {
        gameFlow.addTurn(cell.dataset.id);
        gameFlow.logBoard();
    });
});
