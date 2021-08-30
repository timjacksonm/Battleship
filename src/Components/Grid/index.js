import React, { useState, useEffect } from 'react';
import {
  highlightSelected,
  removeSelected,
  saveSelected,
  getRandomTarget,
} from '../../Helpers/helpers';
import './index.css';

const Grid = (props) => {
  const {
    player,
    currentShip,
    setCurrentShip,
    setStartGame,
    turn,
    setTurn,
    setTitleText,
  } = props;
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
            if (player.checkLoss()) {
              setTitleText(`${player.board} Lost You Win!`);
            } else {
              player.receiveAttack(e);
              setTurn('Computer');
            }
          }}
        ></button>
      );
    }
    return array;
  })();

  useEffect(() => {
    if (
      turn === 'Computer' &&
      player.board === 'Player1' &&
      !player.checkLoss()
    ) {
      const randomNumber = getRandomTarget(player1Container);
      player.receiveAttack({
        target: player1Container.current.children[randomNumber - 1],
      });
      setTurn('Player1');
    }
    if (
      turn === 'Computer' &&
      player.board === 'Player1' &&
      player.checkLoss()
    ) {
      setTitleText(`${player.board} Lost! Computer Wins!`);
    }
  }, [turn, player, setTurn, player1Container, setTitleText]);

  return (
    <div
      className="grid-container"
      id={player.board}
      ref={player.board === 'Player1' ? player1Container : computerContainer}
    >
      {player.board === 'Player1'
        ? playerGrid.map((cell) => cell)
        : computerGrid.map((cell) => cell)}
    </div>
  );
};

export default Grid;
