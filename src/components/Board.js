import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext.js';

import Box from './Box.js';

export default function Board() {
  const { board } = useContext(GameContext);
  return (
    <div className="board">
      {board.map((squareValue, i) => (
        <Box key={i} squareValue={squareValue} squareIndex={i} />
      ))}
    </div>
  );
}
