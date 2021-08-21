import React, { useState, useEffect } from 'react';
import Ship from '../Data/Ships';
import './index.css';

const Gameboard = (props) => {
  const [target, setTarget] = useState();

  const Submarine1 = Ship('Submarine', ['1']);
  const Submarine2 = Ship('Submarine', ['11']);
  const Destroyer1 = Ship('Destroyer', ['21', '22']);
  const Destroyer2 = Ship('Destroyer', ['31', '32']);
  const Cruiser = Ship('Cruiser', ['41', '42', '43']);
  const Battleship = Ship('Battleship', ['51', '52', '53', '54']);
  const Aircraftcarrier = Ship('Aircraft Carrier', [
    '61',
    '62',
    '63',
    '64',
    '65',
  ]);

  const Ships = [
    Submarine1,
    Submarine2,
    Destroyer1,
    Destroyer2,
    Cruiser,
    Battleship,
    Aircraftcarrier,
  ];

  const verifyHit = (e) => {
    const hit = Ships.find((ship, index) => {
      if (ship.hull.includes(e.target.id)) {
        ship.hit(e.target.id);
        return true;
      }
      return false;
    });
    hit ? (e.target.classList += ' hit') : (e.target.classList += ' miss');
    e.target.disabled = true;
  };

  const cellArray = (() => {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(
        <button
          id={i + 1}
          key={i}
          className="grid-item"
          onClick={verifyHit}
        ></button>
      );
    }
    return array;
  })();

  useEffect(() => {
    if (target) {
      const { id, hit } = target;

      console.log(id, hit);
    }
    return () => {};
  }, [target]);
  console.log(Ships);
  return <div className="grid-container">{cellArray.map((cell) => cell)}</div>;
};

export default Gameboard;
