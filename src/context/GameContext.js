import { createContext, useState } from 'react';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentplayer, setCurrentPlayer] = useState('X');
  const [gamemessage, setGameMessage] = useState('');
  const [active, setActive] = useState(true);

  function handleClick(squareIndex) {
    board[squareIndex] = currentplayer;
    console.log('board[squareIndex]', board[squareIndex]);
    // console.log('click');
    //check if game is active, return if false
    //update game message if active is false
    //setboard by inserting current player value into index
    //setPlayer to OTHER player
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
