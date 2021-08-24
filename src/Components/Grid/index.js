import React, { useState, useEffect } from 'react';
import './index.css';

const Grid = (props) => {
  const { player, currentShip, setCurrentShip, setStartGame } = props;
  const [selected, setSelected] = useState();

  const highlightSelected = (e) => {
    const allCells = [...e.target.parentElement.children];
    const { min, max } = {
      min: Number(e.target.id),
      max: Number(e.target.id) + currentShip.length - 1,
    };

    if (
      (min >= 1 && min <= 10 && max >= 1 && max <= 10) ||
      (min >= 11 && min <= 20 && max >= 11 && max <= 20) ||
      (min >= 21 && min <= 30 && max >= 21 && max <= 30) ||
      (min >= 31 && min <= 40 && max >= 31 && max <= 40) ||
      (min >= 41 && min <= 50 && max >= 41 && max <= 50) ||
      (min >= 51 && min <= 60 && max >= 51 && max <= 60) ||
      (min >= 61 && min <= 70 && max >= 61 && max <= 70) ||
      (min >= 71 && min <= 80 && max >= 71 && max <= 80) ||
      (min >= 81 && min <= 90 && max >= 81 && max <= 90) ||
      (min >= 91 && min <= 100 && max >= 91 && max <= 100)
    ) {
      const filteredCells = allCells.filter(
        (element) => element.id <= max && element.id >= min
      );
      setSelected(filteredCells);
      filteredCells.forEach((element) => (element.className += ' selected'));
    }
  };

  const removeSelected = () => {
    selected.forEach((element) => (element.className = 'grid-item'));
  };

  const saveSelected = (e) => {
    const placement = selected.map((cell) => cell.id);
    player.placeShip(currentShip.name, placement);
    selected.forEach(
      (element) => (element.style.backgroundColor = 'limegreen')
    );
    if (player.Ships.length === 7) {
      setStartGame(true);
      const allCells = [...e.target.parentElement.children];
      allCells.forEach((cell) => (cell.disabled = true));
      return;
    }
    setCurrentShip(player.availableToPlace[0]);
  };

  const cellArray = (() => {
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

  return <div className="grid-container">{cellArray.map((cell) => cell)}</div>;
};

export default Grid;
