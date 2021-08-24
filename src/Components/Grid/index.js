import React, { useState, useEffect } from 'react';
import './index.css';

const Grid = (props) => {
  const { player, currentShip, setCurrentShip, setStartGame, startGame } =
    props;
  const [selected, setSelected] = useState();

  const highlightSelected = (e) => {
    const allCells = [...e.target.parentElement.children];
    const { min, max } = {
      min: Number(e.target.id),
      max: Number(e.target.id) + currentShip.length - 1,
    };

    const collision = player.Ships.map((ship) =>
      ship.hull.some(
        (position) => Number(position) >= min && Number(position) <= max
      )
    ).filter((value) => value === true);

    if (
      (min >= 1 && min <= 10 && max >= 1 && max <= 10 && !collision[0]) ||
      (min >= 11 && min <= 20 && max >= 11 && max <= 20 && !collision[0]) ||
      (min >= 21 && min <= 30 && max >= 21 && max <= 30 && !collision[0]) ||
      (min >= 31 && min <= 40 && max >= 31 && max <= 40 && !collision[0]) ||
      (min >= 41 && min <= 50 && max >= 41 && max <= 50 && !collision[0]) ||
      (min >= 51 && min <= 60 && max >= 51 && max <= 60 && !collision[0]) ||
      (min >= 61 && min <= 70 && max >= 61 && max <= 70 && !collision[0]) ||
      (min >= 71 && min <= 80 && max >= 71 && max <= 80 && !collision[0]) ||
      (min >= 81 && min <= 90 && max >= 81 && max <= 90 && !collision[0]) ||
      (min >= 91 && min <= 100 && max >= 91 && max <= 100 && !collision[0])
    ) {
      const filteredCells = allCells.filter(
        (element) => element.id <= max && element.id >= min
      );
      setSelected(filteredCells);
      filteredCells.forEach((element) => (element.className += ' selected'));
    } else setSelected(null);
  };

  const removeSelected = () => {
    if (selected) {
      selected.forEach((element) => (element.className = 'grid-item'));
    }
  };

  const saveSelected = (e) => {
    if (selected) {
      const placement = selected.map((cell) => cell.id);
      player.placeShip(currentShip.name, placement);
      selected.forEach((element) => {
        element.style.backgroundColor = 'limegreen';
        element.disabled = true;
      });
      if (player.Ships.length === 7) {
        setCurrentShip(null);
        setStartGame(true);
        const allCells = [...e.target.parentElement.children];
        allCells.forEach((cell) => (cell.disabled = true));
        return;
      }
      setCurrentShip(player.availableToPlace[0]);
    }
  };

  const playerGrid = (() => {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(
        <button
          id={i + 1}
          key={i}
          className="grid-item"
          onMouseOver={highlightSelected}
          onMouseOut={removeSelected}
          onClick={saveSelected}
        ></button>
      );
    }
    return array;
  })();

  const computerGrid = (() => {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(
        <button
          id={i + 1}
          key={i}
          className="grid-item"
          onClick={(e) => player.receiveAttack}
        ></button>
      );
    }
    return array;
  })();

  return (
    <div className="grid-container">
      {player.name === 'Player1'
        ? playerGrid.map((cell) => cell)
        : computerGrid.map((cell) => cell)}
    </div>
  );
};

export default Grid;
