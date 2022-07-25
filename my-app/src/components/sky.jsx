import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { positionXY } from "../reducers/valueBeginReducer";
import { getPositionX, getPositionY } from "../reducers/valueBeginSelector";

const Sky = () => {
    
    const dispatch = useDispatch()
    const sendPosXY = useCallback(
        (x,y) => dispatch(positionXY(x,y)),
        [dispatch]
      )

    const posX = (e)=>{
        console.log('x: '+(e.view.innerWidth/2-e.clientX))
        console.log('y:' + (e.view.innerHeight - e.clientY-70))
        // console.log(e.view.innerHeight/2-e.clientY)
        
        sendPosXY(e.view.innerWidth/2-e.clientX,e.view.innerHeight - e.clientY-100)
    }

    const skyStyle = {
      fill: '#30abef',
    };
    const skyWidth = 5000;
    const gameHeight = 1200;
    return (
      <rect
        style={skyStyle}
        x={skyWidth/-2}
        y={100 - gameHeight}
        width={skyWidth}
        height={gameHeight}
        onMouseMove={(e)=>posX(e)}
        
      />
    );
  };

export default Sky