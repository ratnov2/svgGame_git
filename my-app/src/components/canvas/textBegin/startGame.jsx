import React from 'react';
import PropTypes from 'prop-types';
//import { gameWidth } from '../utils/constants';

const StartGame = (props) => {
  
  const button = {
    x: 800/ -2, // половина ширины
    y: -280, // минус значит "над" (выше нуля)
    width: 800,
    height: 200,
    rx: 10, // border радиус
    ry: 10, // border радиус
    style: {
      fill: 'transparent',
      cursor: 'pointer',
    },
   onClick: props.changeStartGame,
  };

  const text = {
    textAnchor: 'middle', // центр
    x: 0, // центр относительно оси X
    y: -150, // 150 выше нуля (по оси Y)
    style: {
      fontFamily: '"Joti One", cursive',
      fontSize: 60,
      fill: '#e3e3e3',
      cursor: 'pointer',
    
    },
    onClick: props.changeStartGame,
  };
  return (
    <g>
      <rect {...button} />
      <text {...text}>
        Tap To Start!
      </text>
    </g>
  );
};

StartGame.propTypes = {
  //onClick: PropTypes.func.isRequired,
};

export default StartGame;