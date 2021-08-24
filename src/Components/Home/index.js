import React, { useState, useEffect } from 'react';
import Grid from '../Grid';
import Gameboard from '../../Data/Gameboard';
import './index.css';
const player = Gameboard('Player1');
const computer = Gameboard('Computer');

function Home() {
  const [currentShip, setCurrentShip] = useState(player.availableToPlace[0]);
  const [rotation, setRotation] = useState('horizontal');
  const [startGame, setStartGame] = useState(false);
  console.log(computer, player);
  return (
    <div className="page">
      <h1>Battleship</h1>
      {!startGame ? (
        <h2>
          place your <p>{currentShip.name}</p>
        </h2>
      ) : (
        <h2>Click enemy grid to fire!</h2>
      )}
      {startGame && (
        <div className="names">
          <h2 className="flex">{player.name}</h2>
          <h2>vs</h2>
          <h2 className="flex">{computer.name}</h2>
        </div>
      )}
      <div className="container">
        <Grid
          player={player}
          currentShip={currentShip}
          setCurrentShip={setCurrentShip}
          rotation={rotation}
          setStartGame={setStartGame}
          startGame={startGame}
        />
        {startGame && (
          <Grid
            player={computer}
            currentShip={currentShip}
            setCurrentShip={setCurrentShip}
            rotation={rotation}
            setStartGame={setStartGame}
            startGame={startGame}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
