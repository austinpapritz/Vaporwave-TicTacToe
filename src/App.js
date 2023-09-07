import { useContext } from 'react';
import './App.css';

import Board from './components/Board.js';
import { GameContext } from './context/GameContext.js';

function App() {
  const { gameMessage, currentPlayer, handleResetGame } = useContext(GameContext);

  return (
    <div className="App">
      <button className="reset-btn" onClick={handleResetGame}>
        New Game
      </button>
      <div className="alpha-container">
        <h1>Tic Tac Toe</h1>
        <h2>{gameMessage}</h2>
        <h2>Current player: {currentPlayer}</h2>
        <Board />
      </div>
    </div>
  );
}

export default App;
