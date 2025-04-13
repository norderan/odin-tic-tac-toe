

//factory for player
const Player = function (mark) {
    this.mark = mark;
} 


//factory for gameboards
const GameBoard = function () {
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


const board1 = GameBoard();

board1.addMark("x",0);
board1.addMark("x",1);
board1.addMark("x",2);

board1.logBoard()
console.log(board1.checkForWin("x"))
