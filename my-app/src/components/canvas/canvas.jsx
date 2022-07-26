import { element } from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStartGame, deleteNloIadro, pushElementNLO, setFlyingObject, setPositionBale } from '../../reducers/valueBeginReducer';
import { getAncke, getFlyingObject, getPopadanie, getPositionBale, getStartGame } from '../../reducers/valueBeginSelector';

import Ground from './ground';
import Sky from './sky';
import FlyingObject from '../flyingObject/flyingObject';
import CannonPipe from '../cannon/cannonPipe';
import CannonBase from '../cannon/cannonBase';
import CannonBall from '../cannon/cannonBale';
import StartGame from './textBegin/startGame';
import Title from './textBegin/title';
import TextBegin from './textBegin/textBegin';
import { ballPosMove, formPosObjectBall, setCoordNlo } from '../../InitHelp/HelpFunction';
const sideOn = ['right','left']

const Canvas = () => {
  const startGame = useSelector(getStartGame)
  const  ancle = useSelector(getAncke)
  const positionBale = useSelector(getPositionBale)
  const flyingObjectValue = useSelector(getFlyingObject)
  const popadanie = useSelector(getPopadanie)

  const [delay, setDelay] = useState(4000);
  const [delay2, setDelay2] = useState(20);
  const [pushNlo, setPushNlo] = useState(startGame);
  const [isRunning2, setIsRunning2] = useState(true);
  const [kk1,kk2] = useState(false)
  let [posXY,changePosXY] = useState({x:0,y:0})
  let coordNlo = setCoordNlo
  
  
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
    // useEffect(() => {
    //   const timer = window.setInterval(() => {
       
    //   }, 20);                                                                                                                                                                                                                                                                                                                                                               
    //   return () => {
    //     window.clearInterval(timer);
    //   };
    // }, []);
    useInterval(()=>{
      flyingObjectDis()
    },startGame ? 20 : null)
    useInterval(() => {
      if(flyingObjectValue.length<9) {
        pushElementNLODis(coordNlo(flyingObjectValue))
      }else  setPushNlo(false)
    }, startGame ? delay : null );
    useInterval(() => {
      flyingObjectValue.forEach((element,index)=>{
        if(  ((positionBale.x+60)>=element.x) 
          && ((positionBale.x-55)<=element.x) 
          && ((positionBale.y+10)>=element.y)
          && ((positionBale.y-10)<=element.y)
          ){
            DeleteindexNlo(index)
            setIsRunning2(false)
          console.log('POPAL - берём индекс этого элемента и передаём его в стейт, где сортировка - удаление его, потом перезапускаем сет интевал в случае клика по холсту и ядро летит')
        }
      })
      
    }, isRunning2 ? delay2 : null );
    
  const dispatch = useDispatch()
    const setPositionBaleSel = useCallback(
        (position) => dispatch(setPositionBale(position)),
        [dispatch]
      )
    const flyingObjectDis = useCallback(
        () => dispatch(setFlyingObject()),
        [dispatch]
      )
    const pushElementNLODis = useCallback(
        (element) => dispatch(pushElementNLO(element)),
        [dispatch]
      )
    const DeleteindexNlo = useCallback(
        (index) => dispatch(deleteNloIadro(index)),
        [dispatch]
      )
    const disStartGame = useCallback(
        (stan) => dispatch(changeStartGame(stan)),
        [dispatch]
      )
      useEffect(()=>{
        setPositionBaleSel(posXY)
       },[posXY])
  
  const gameHeight = 1200;
  const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];
  let rast = ()=>{
    setInterval(()=>{
      changePosXY(posXY =>formPosObjectBall(posXY,ancle)); //i have setInterval + hooks; dan abramov - useInterval
   },20)
   }
  return (
    <svg
      id="aliens-go-home-canvas"
      viewBox={viewBox} 
      onClick = {(e)=> {
       return (startGame ? rast() : undefined)
        // kk2(true)
        // setDelay(1000)
      }}
    >
   
      <Sky positionBale = {setPositionBaleSel}/>
      <Ground />
      <CannonPipe ancle={ancle}/>
      <CannonBase />
      {!popadanie ? <CannonBall position={positionBale} /> : ''}
      {/* <FlyingObject position={flyingObjectValue[0]} /> */}
      {flyingObjectValue.map((id,index)=><FlyingObject key={index} position={flyingObjectValue[index]} />)}
      {!startGame? <TextBegin changeStartGame = {disStartGame}/>:''}
      
    </svg>
  );
};

export default Canvas;