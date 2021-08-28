import React, { useState } from 'react';
import Grid from '../Grid';
import Gameboard from '../../Data/Gameboard';
import { getRandomPlacements } from '../../Helpers/helpers';
import './index.css';
const player = Gameboard('Player1');
const computer = Gameboard('Computer');
const {
  submarine1,
  submarine2,
  destroyer1,
  destroyer2,
  cruiser,
  battelship,
  aircraftcarrier,
} = getRandomPlacements();
computer.placeShip('Submarine1', submarine1.position);
computer.placeShip('Submarine2', submarine2.position);
computer.placeShip('Destroyer1', destroyer1.position);
computer.placeShip('Destroyer2', destroyer2.position);
computer.placeShip('Cruiser', cruiser.position);
computer.placeShip('Battleship', battelship.position);
computer.placeShip('Aircraft Carrier', aircraftcarrier.position);

function Home() {
  const [currentShip, setCurrentShip] = useState(player.availableToPlace[0]);
  const [rotation, setRotation] = useState('horizontal');
  const [startGame, setStartGame] = useState(false);
  const [turn, setTurn] = useState('Player1');
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
          turn={turn}
          setTurn={setTurn}
        />
        {startGame && <Grid player={computer} turn={turn} setTurn={setTurn} />}
      </div>
    </div>
  );
}

export default Home;
