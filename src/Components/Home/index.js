import React, { useState, useEffect } from 'react';
import Grid from '../Grid';
import Gameboard from '../../Data/Gameboard';
import './index.css';
const player = Gameboard();

function Home() {
  const [currentShip, setCurrentShip] = useState(player.availableToPlace[0]);
  const [rotation, setRotation] = useState('horizontal');
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    console.log(player);
    return () => {};
  }, [startGame]);
  return (
    <div className="page">
      <h1>Battleship</h1>
      <h2>
        place your <p>{currentShip.name}</p>
      </h2>
      <div className="container">
        <Grid
          name={'bob'}
          player={player}
          currentShip={currentShip}
          setCurrentShip={setCurrentShip}
          rotation={rotation}
          setStartGame={setStartGame}
        />
        {startGame && <Grid name={'jake'} />}
      </div>
    </div>
  );
}

export default Home;
