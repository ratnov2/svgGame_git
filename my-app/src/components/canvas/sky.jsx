import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ballPosMove } from "../../InitHelp/HelpFunction";
import { positionXY } from "../../reducers/valueBeginReducer";
import { getAncke} from "../../reducers/valueBeginSelector";

const Sky = (props) => {
  let g = true
  let anke = useSelector(getAncke)

  // if (anke < 0){
  //   anke = 90 - anke
  // }
  // else
  //   anke = 270 - anke

  let [posXY,changePosXY] = useState({x:0,y:0})

   useEffect(()=>{
    props.positionBale(posXY)
   },[posXY])
    const dispatch = useDispatch()
    const sendPosXY = useCallback(
        (x,y) => dispatch(positionXY(x,y)),
        [dispatch]
      )

    const posX = (e)=>{     
        sendPosXY(e.view.innerWidth/2-e.clientX,e.view.innerHeight - e.clientY-66)
    }
    // let rast = ()=>{
    //   setInterval(()=>{
    //     changePosXY(posXY =>({x:posXY.x+ballPosMove('sin',anke),y:posXY.y+ballPosMove('cos',anke)})); //i have setInterval + hooks; dan abramov - useInterval
    //  },20)
    //  }
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
        // onClick={g ? ()=>rast() : undefined} 
      />
      
    );
  };

export default Sky