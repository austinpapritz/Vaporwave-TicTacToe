import { createContext, useState } from 'react';
// import { useGame } from '../hooks/useGame.js';
const GameContext = createContext();
import winningCombos from '../game-data.js';

const GameProvider = ({ children }) => {
  //   const { board, setBoard } = useGame();
  //   const { active, setActive } = useGame();
  const [active, setActive] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameMessage, setGameMessage] = useState('');

  function handleClick(squareIndex) {
    //make xIndice array which includes (index + 1).join('') of every X position
    // const xIndice = [];

    // for (let i = 0; i < board.length; i++) {
    //   board[i].indexOf('X');
    // }
    //if winningCombos.map((combo) => xIndice.includes(combo) then setActive(false)

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

    setBoard(board);

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
