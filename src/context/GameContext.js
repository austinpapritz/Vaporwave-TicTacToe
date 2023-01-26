import { createContext, useState } from 'react';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentplayer, setCurrentPlayer] = useState('X');
  const [gamemessage, setGameMessage] = useState('Turn: X');

  return (
    <GameContext.Provider
      value={{ board, setBoard, currentplayer, setCurrentPlayer, gamemessage, setGameMessage }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
