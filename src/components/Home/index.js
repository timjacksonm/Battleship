import React from 'react';
import Gameboard from '../Gameboard';
import './index.css';

function Home() {
  return (
    <div className="page">
      <h1>Home</h1>
      <div className="container">
        <Gameboard player={'one'} />
        <Gameboard player={'two'} />
      </div>
    </div>
  );
}

export default Home;
