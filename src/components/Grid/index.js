import React from 'react';
import './index.css';

const Grid = (props) => {
  const cellArray = (() => {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(<button id={i + 1} key={i} className="grid-item"></button>);
    }
    return array;
  })();

  return <div className="grid-container">{cellArray.map((cell) => cell)}</div>;
};

export default Grid;
