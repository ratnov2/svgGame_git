import { element } from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushElementNLO, setFlyingObject, setPositionBale } from '../../reducers/valueBeginReducer';
import { getAncke, getFlyingObject, getPositionBale } from '../../reducers/valueBeginSelector';

import Ground from './ground';
import Sky from './sky';
import FlyingObject from '../flyingObject/flyingObject';
import CannonPipe from '../cannon/cannonPipe';
import CannonBase from '../cannon/cannonBase';
import CannonBall from '../cannon/cannonBale';
const sideOn = ['right','left']

const Canvas = () => {

  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  const positionBale = useSelector(getPositionBale)
  let flyingObjectValue = useSelector(getFlyingObject)
  let [quantityNLO, changeQuantityNLO] = useState(flyingObjectValue)
  let [kk1,kk2] = useState(false)
  let position = {x:400,y:-400}
 useEffect(() => {
      const timer = window.setInterval(() => {
        flyingObjectDis(7)
        // <-- Change this line!
      }, 20);                                                                                                                                                                                                                                                                                                                                                               
      return () => {
        window.clearInterval(timer);
      };
    }, []);
    let hog =(e)=>{
      console.log(e)
    }
    function useInterval(callback, delay) {
      const savedCallback = useRef();
    
      // Remember the latest callback.
      useEffect(() => {
        savedCallback.current = callback;
      }, [callback]);
    
      // Set up the interval.
      useEffect(() => {
        function tick() {
          savedCallback.current();
        }
        if (delay !== null) {
          let id = setInterval(tick, delay);
          return () => clearInterval(id);
        }
      }, [delay]);
    }
    useInterval(() => {
      // Your custom logic here
      if(flyingObjectValue.length<4) {
        pushElementNLODis({id:sideOn[(Math.floor(Math.random())*2)+1],x:200,y:-300})
        console.log(flyingObjectValue)
      }else  setIsRunning(false)
     
    }, isRunning ? delay : null );
  
    useInterval(() => {
      flyingObjectValue.forEach(element=>{
        if(  ((positionBale.x+60)>=element.x) 
          && ((positionBale.x-55)<=element.x) 
          && ((positionBale.y+10)>=element.y)
          && ((positionBale.y-10)<=element.y)
          ){
          console.log('POPAL')
        }
      })
      
    }, 20  );
  const dispatch = useDispatch()
    const setPositionBaleSel = useCallback(
        (position) => dispatch(setPositionBale(position)),
        [dispatch]
      )
      const flyingObjectDis = useCallback(
        (position) => dispatch(setFlyingObject(position)),
        [dispatch]
      )
      const pushElementNLODis = useCallback(
        (element) => dispatch(pushElementNLO(element)),
        [dispatch]
      )
    // useEffect(()=>{
      
    //   if(kk1)
    //     pushElementNLODis({id:sideOn[(Math.floor(Math.random())*2)+1],x:200,y:-300})
    //   //console.log(quantityNLO)
    // },[quantityNLO])
  const ancle = useSelector(getAncke)
  const gameHeight = 1200;
const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];
  return (
    <svg
      id="aliens-go-home-canvas"
      viewBox={viewBox} 
      onClick = {(e)=>{
        hog(e)
        kk2(true)
        setDelay(1000)
      }}
      onContextMenu={()=>{console.log('2323')}}
    >
      
      <Sky positionBale = {setPositionBaleSel}/>
      <Ground />
      <CannonPipe ancle={ancle}/>
      <CannonBase />
      <CannonBall position={positionBale} />
      {/* <FlyingObject position={flyingObjectValue[0]} /> */}
      {flyingObjectValue.map((id,index)=><FlyingObject key={index} position={flyingObjectValue[index]} />)}
      
    </svg>
  );
};

export default Canvas;