import { useContext } from 'react';
import './App.css';

import Board from './components/Board.js';
import { GameContext } from './context/GameContext.js';

function App() {
  const { gamemessage, currentplayer } = useContext(GameContext);

  console.log('gamemessage', gamemessage);
  console.log('currentplayer', currentplayer);

  return (
    <div className="App">
      <div className="alpha-container">
        <Board />
      </div>
    </div>
  );
}

export default App;
