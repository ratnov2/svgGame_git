import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getAncke } from '../../reducers/valueBeginSelector';
import CannonBall from '../cannonBale';
import CannonBase from '../cannonBase';
import CannonPipe from '../cannonPipe';
import Ground from '../ground';
import Sky from '../sky';

const Canvas = () => {
  let position = {x:100,y:100}
  const ancle = useSelector(getAncke)
  const viewBox = [window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, window.innerHeight];
  return (
    <svg
      id="aliens-go-home-canvas"
      viewBox={viewBox}
    >
      
      <Sky />
      <Ground />
      <CannonPipe ancle={ancle}/>
      <CannonBase />
      <CannonBall position={position}/>
      
    </svg>
  );
};

export default Canvas;