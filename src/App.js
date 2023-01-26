import { useContext } from 'react';
import './App.css';

import Board from './components/Board.js';
import { GameContext } from './context/GameContext.js';

function App() {
  const { gamemessage, currentplayer } = useContext(GameContext);

  return (
    <div className="App">
      <div className="alpha-container">
        <h1>Tic Tac Toe</h1>
        <h2>{gamemessage}</h2>
        <h2>Current player: {currentplayer}</h2>
        <Board />
      </div>
    </div>
  );
}

export default App;
