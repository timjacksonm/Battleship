import React from 'react';
import Gameboard from '../Gameboard';
import './index.css';

function Home() {
  return (
    <div className="page">
      <h1>Home</h1>
      <div className="container">
        <Gameboard player={'name1'} />
        {/* <Gameboard player={'name2'} /> */}
      </div>
    </div>
  );
}

export default Home;
