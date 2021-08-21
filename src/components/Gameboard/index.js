import React from 'react';
import Ship from '../Data/Ships';
import './index.css';

function index() {
  const Submarine1 = Ship('Submarine', ['1']);
  const Submarine2 = Ship('Submarine', ['2']);
  const Destroyer1 = Ship('Destroyer', ['2']);
  const Destroyer2 = Ship('Destroyer', ['2']);
  const Cruiser = Ship('Cruiser', ['2']);
  const Battleship = Ship('Battleship', ['2']);
  const Aircraftcarrier = Ship('Aircraft Carrier', ['2']);

  const Ships = [
    Submarine1,
    Submarine2,
    Destroyer1,
    Destroyer2,
    Cruiser,
    Battleship,
    Aircraftcarrier,
  ];

  const grid = (() => {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(<div id={i} key={i} className="grid-item"></div>);
    }
    return array;
  })();

  return <div className="grid-container">{grid.map((cell) => cell)}</div>;
}

export default index;
