import React from 'react';
import Grid from '../Grid';
import Gameboard from '../Data/Gameboard';
import './index.css';

function Home() {
  return (
    <div className="page">
      <h1>Home</h1>
      <div className="container">
        <Grid name={'bob'} />
        <Grid name={'jake'} />
      </div>
    </div>
  );
}

export default Home;
