import React, { useState, useEffect } from 'react';
import {
  highlightSelected,
  removeSelected,
  saveSelected,
  getRandomTarget,
} from '../../Helpers/helpers';
import './index.css';

const Grid = (props) => {
  const { player, currentShip, setCurrentShip, setStartGame, turn, setTurn } =
    props;
  const [selected, setSelected] = useState();
  const [player1Container] = useState(React.createRef());
  const [computerContainer] = useState(React.createRef());

  const playerGrid = (() => {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(
        <button
          id={i + 1}
          key={i}
          className="grid-item"
          onMouseOver={(e) =>
            highlightSelected(e, player, currentShip, setSelected)
          }
          onMouseOut={() => removeSelected(selected)}
          onClick={(e) =>
            saveSelected(
              e,
              selected,
              player,
              currentShip,
              setCurrentShip,
              setStartGame
            )
          }
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
          onClick={(e) => {
            if (turn === 'Player1') {
              player.receiveAttack(e);
              const result = player.checkLoss();
              result === true
                ? alert(`${player.name} Lost!`)
                : setTurn('Computer');
            }
          }}
        ></button>
      );
    }
    return array;
  })();

  useEffect(() => {
    if (turn === 'Computer' && player.name === 'Player1') {
      const randomNumber = getRandomTarget(player1Container);
      player.receiveAttack({
        target: player1Container.current.children[randomNumber - 1],
      });
      const result = player.checkLoss();
      result === true ? alert(`${player.name} Lost!`) : setTurn('Computer');
      setTurn('Player1');
    }
    return () => {};
  }, [turn, player, setTurn, player1Container]);

  return (
    <div
      className="grid-container"
      id={player.name}
      ref={player.name === 'Player1' ? player1Container : computerContainer}
    >
      {player.name === 'Player1'
        ? playerGrid.map((cell) => cell)
        : computerGrid.map((cell) => cell)}
    </div>
  );
};

export default Grid;
