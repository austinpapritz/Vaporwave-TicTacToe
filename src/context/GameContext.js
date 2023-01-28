import { createContext, useState } from 'react';
const GameContext = createContext();
import winningCombos from '../game-data.js';

const GameProvider = ({ children }) => {
  const [active, setActive] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameMessage, setGameMessage] = useState('');

  //if user presses New Game button, then reset everything to restart
  function handleResetGame() {
    setActive(true);
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameMessage('');
  }

  function handleClick(squareIndex) {
    //if game is inactive (win or draw) then return
    if (active === false) {
      return;
    }

    //if the value of div clicked is a string, means it's already clicked
    if (typeof board[squareIndex] === 'string') {
      return;
    }

    //insert the currentplayer value in the the index of the clicked square
    board[squareIndex] = currentPlayer;
    //setBoard to updated board
    setBoard(board);

    //CHECK IF TIE
    //if there does not exist a null item in the board array then GAME OVER
    function checkIfTie() {
      if (active) {
        if (!board.some((a) => a === null)) {
          setGameMessage('GAME OVER');
          setCurrentPlayer('TIE GAME');
          setActive(false);
        }
      }
    }

    //switch players, assuming it is not a win or tie already
    if (active) {
      if (currentPlayer === 'X') {
        setCurrentPlayer('O');
      } else if (currentPlayer === 'O') {
        setCurrentPlayer('X');
      }
    }

    //CHECK IF WIN
    //retrieves the SQUARE NUMBER of every position X or O lives
    function getIndicesOf(searchStr, str) {
      let searchStrLen = searchStr.length;
      if (searchStrLen === 0) {
        return [];
      }
      let startIndex = 0,
        index,
        indices = [];

      while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index + 1);
        startIndex = index + searchStrLen;
      }
      return indices;
    }

    //arrays of the square-position of x and o are join() into
    //this string of positions will be compared to all the winning combos
    let xIndices = getIndicesOf('X', board).join('');
    let oIndices = getIndicesOf('O', board).join('');

    //loop winningCombos, for every combo, search x and o indices, if true then setActive(false)
    function checkWinner() {
      for (let i = 0; i < winningCombos.length - 1; i++) {
        if (xIndices.indexOf(winningCombos[i]) !== -1) {
          setGameMessage('GAME OVER');
          setCurrentPlayer('X WINS!');
          setActive(false);
          return;
        } else if (oIndices.indexOf(winningCombos[i]) !== -1) {
          setGameMessage('GAME OVER');
          setCurrentPlayer('O WINS!');
          setActive(false);
          return;
        } else {
          if (!active) return;
          checkIfTie();
        }
      }
    }

    checkWinner();
  }

  return (
    <GameContext.Provider
      value={{
        active,
        setActive,
        board,
        setBoard,
        currentPlayer,
        setCurrentPlayer,
        gameMessage,
        setGameMessage,
        handleClick,
        handleResetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
