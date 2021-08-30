import React, { useState, useEffect } from 'react';
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
  const [titleText, setTitleText] = useState('Click enemy grid to fire!');
  const [resetBtn, setResetBtn] = useState(false);

  useEffect(() => {
    if (titleText !== 'Click enemy grid to fire!') {
      setResetBtn(true);
    }
  }, [titleText]);
  return (
    <div className="page">
      <h1>Battleship</h1>
      {resetBtn && (
        <button onClick={() => window.location.reload()}>Reset Game!</button>
      )}
      {!startGame ? (
        <h2>
          place your <p>{currentShip.name}</p>
        </h2>
      ) : (
        <>
          <h2>{titleText}</h2>
          <div className="names">
            <h2 className="flex">{player.board}</h2>
            <h2>vs</h2>
            <h2 className="flex">{computer.board}</h2>
          </div>
        </>
      )}
      <div className="container">
        <Grid
          player={player}
          currentShip={currentShip}
          setCurrentShip={setCurrentShip}
          setStartGame={setStartGame}
          turn={turn}
          setTurn={setTurn}
          setTitleText={setTitleText}
        />
        {startGame && (
          <Grid
            player={computer}
            turn={turn}
            setTurn={setTurn}
            setTitleText={setTitleText}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
