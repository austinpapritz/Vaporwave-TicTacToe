import React from 'react';
import { useContext } from 'react';

import { GameContext } from '../context/GameContext.js';

export default function Box({ squareValue, squareIndex }) {
  const { handleClick } = useContext(GameContext);

  return (
    <div className="square" onClick={() => handleClick(squareIndex)}>
      {squareValue}
    </div>
  );
}
