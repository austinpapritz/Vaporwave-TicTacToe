import { createContext, useState } from 'react';
// import { useGame } from '../hooks/useGame.js';
const GameContext = createContext();
import winningCombos from '../game-data.js';

const GameProvider = ({ children }) => {
  const [active, setActive] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameMessage, setGameMessage] = useState('');

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
    let xIndices = getIndicesOf('X', board).join('');
    let oIndices = getIndicesOf('O', board).join('');

    console.log('xIndices', xIndices);

    //loop winningCombos, for every combo, search x and o indices, if true then setActive(false)
    function checkWinner() {
      for (let i = 0; i < winningCombos.length - 1; i++) {
        if (xIndices.indexOf(winningCombos[i]) !== -1) {
          setActive(false);
          console.log('x wins!');
        }

        if (oIndices.indexOf(winningCombos[i]) !== -1) {
          setActive(false);
          console.log('o wins!');
        }
      }
    }

    checkWinner();

    //check if tie or win to set active false
    function checkIfWinOrTie() {
      if (board.some((a) => a === null)) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
    checkIfWinOrTie();

    //switch players
    if (currentPlayer === 'X') {
      setCurrentPlayer('O');
    } else if (currentPlayer === 'O') {
      setCurrentPlayer('X');
    }

    //update game message if active is false
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
