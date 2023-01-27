import { createContext, useState } from 'react';
import { useGame } from '../hooks/useGame.js';
const GameContext = createContext();

const GameProvider = ({ children }) => {
  const { board, setBoard } = useGame();
  const [currentplayer, setCurrentPlayer] = useState('X');
  const [gamemessage, setGameMessage] = useState('');
  const [active, setActive] = useState(true);

  function handleClick(squareIndex) {
    console.log('squareIndex', squareIndex);

    //if game is inactive (win or draw) then return
    if (active === false) {
      return;
    }

    //if the value of div clicked is a string, means it's already clicked
    if (typeof board[squareIndex] === 'string') {
      return;
    }

    //insert the currentplayer value in the the index of the clicked square
    board[squareIndex] = currentplayer;
    console.log('board', board);
    setBoard(board);

    //check if cats game or win to set active false
    function checkIfWinOrTie() {
      if (board.some((a) => a === null)) {
        setActive(true);
        return true;
      } else {
        setActive(false);
        return false;
      }
    }

    checkIfWinOrTie();
    console.log('check if tie', checkIfWinOrTie());

    //switch players
    if (currentplayer === 'X') {
      setCurrentPlayer('O');
    } else if (currentplayer === 'O') {
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
        currentplayer,
        setCurrentPlayer,
        gamemessage,
        setGameMessage,
        handleClick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
