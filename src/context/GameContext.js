import { createContext, useState } from 'react';

import { winnersData, boardData } from '../game-data.js';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(boardData);

  return <GameContext.Provider value={{ board, setBoard }}>{children}</GameContext.Provider>;
};

export { GameContext, GameProvider };
