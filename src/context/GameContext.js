import { createContext, useState } from 'react';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(Array(9).fill(null));

  return <GameContext.Provider value={{ board, setBoard }}>{children}</GameContext.Provider>;
};

export { GameContext, GameProvider };
