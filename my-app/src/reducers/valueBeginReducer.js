import { element } from "prop-types"
import { coordYRandInit, randomSides, randomXCoord } from "../InitHelp/HelpFunction"

const POSITION_X_Y ='POSITION_X_Y'
const POSITION_BALE_XY='POSITION_BALE_XY'
const FLYING_OBJECT = 'FLYING_OBJECT'
const PUSH_ELEMENT_NLO = 'PUSH_ELEMENT_NLO'

const sidesNlo=['left','right'] // обозначение в какую сторону будут лететь тарелки

const initStateProps={
    Ground:{
        groundStyle:{
            fill: '#59a941',
          },
        division:{
            stroke: '#458232',
            strokeWidth: '3px',
        },
        groundWidth: 5000
    },
    Sky:{
        skyStyle:{
            fill: '#30abef',
          },
        skyWidth:5000,
        gameHeight:1200
    },
    canvas:{
        gameHeight:1200
    },
    cannonBall:{
        ballStyle :{
            fill: '#777',
            stroke: '#444',
            strokeWidth: '2px',
        },
        rx:16,
        ry:16
    },
    cannonBase:{
        cannonBaseStyle :{
            fill: '#a16012',
            stroke: '#75450e',
            strokeWidth: '2px',
          },
          baseWith:80,
          halfBase:40,
          height:60,
          initialControlPoint:{x:20},
          endingControlPoint:{x:60},
          endingAxis:{y:0}
    },
    cannonPipe:{
        cannonPipeStyle:{
            fill: '#999',
            stroke: '#666',
            strokeWidth: '2px',
        },
        muzzleWidth: 40,
        halfMuzzle:20,
        height :100,
        yBasis: 70,
        initialControlPoint:{x:-40,yKf:1.7},
        endingControlPoint:{x:80,yKf:1.7},
        endingAxis:{y:0}
    }
}

let initialState = {
    x: 0,
    y: 0,
    uk:0,
    positionBale:{x:0,y:0},
    flyingObject: [{
        id:randomSides(sidesNlo),
        x:randomXCoord(),
        y:coordYRandInit(100) //исправить нижнее положение
    },{
        id:randomSides(sidesNlo),
        x:randomXCoord(),
        y:coordYRandInit(window.innerHeight/2) //исправить нижнее положение
    }]
}
//console.log(randomInitCoord(initialState.flyingObject))

const valueBeginReducer =(state=initialState,action)=>{
    switch(action.type){
        case POSITION_X_Y:
            //console.log(Math.atan(action.y/(action.x))*57.29577951308)
            
            return{
                ...state,
                x:action.x,
                y:action.y,
                uk:Math.atan(action.y/(action.x))*57.29577951308
  
                
            }
        case POSITION_BALE_XY:
        return{
            ...state,
            positionBale:action.position
        }
        case FLYING_OBJECT:
            return{
                ...state,
                flyingObject: [...state.flyingObject.map((u)=>{
                    if(u.x > (window.innerWidth/2+100))
                        u.id = 'left'
                    else if( u.x < (-window.innerWidth/2-100) )
                        u.id = 'right'
                    if(u.id == 'left'){
                        u.x -=5
                    }
                    else if (u.id=='right')u.x +=5

                    return u})]
                
            }
        case PUSH_ELEMENT_NLO:
            return{
                ...state,
                flyingObject:[...state.flyingObject,action.element]
            }
        
    default: return state
    }
}
export const positionXYCreatore = (x,y)=>({
    type:POSITION_X_Y,
    x,
    y
})
export const positionBaleCreatore = (position)=>({
    type:POSITION_BALE_XY,
    position
})
export const flyingObjectCreatore = (position)=>({
    type:FLYING_OBJECT,
    position
})
export const pushElementNLOCreatore = (element)=>({
    type:PUSH_ELEMENT_NLO,
    element
})

export const pushElementNLO = (element)=>(dispatch)=>{ 
    dispatch(pushElementNLOCreatore(element))
}
export const setFlyingObject = (position)=>(dispatch)=>{ 
    dispatch(flyingObjectCreatore(position))
}
export const positionXY = (x,y)=>(dispatch)=>{ 
    dispatch(positionXYCreatore(x,y))
}
export const setPositionBale = (position)=>(dispatch)=>{ 
    dispatch(positionBaleCreatore(position))
}

export default valueBeginReducer