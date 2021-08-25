import React, { useState } from 'react';
import Grid from '../Grid';
import Gameboard from '../../Data/Gameboard';
import './index.css';
const player = Gameboard('Player1');
const computer = Gameboard('Computer');
computer.placeShip('Submarine1', ['1']);
computer.placeShip('Submarine2', ['3']);
computer.placeShip('Destroyer1', ['11', '12']);
computer.placeShip('Destroyer2', ['14', '15']);
computer.placeShip('Cruiser', ['25', '26', '27']);
computer.placeShip('Battleship', ['35', '36', '37', '38']);
computer.placeShip('Aircraft Carrier', ['41', '42', '43', '44', '45']);

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
