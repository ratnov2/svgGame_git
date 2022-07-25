
const POSITION_X_Y ='POSITION_X_Y'

let initialState = {
    x: 0,
    y: 0,
    uk:0
}

const valueBeginReducer =(state=initialState,action)=>{
    switch(action.type){
        case POSITION_X_Y:
            return{
                ...state,
                x:action.x,
                y:action.y,
                uk:Math.atan(action.y/(action.x))*57.29577951308
                // (
                //     action.x<0 ? Math.atan(action.y/(action.x))*57.29577951308
                //     : Math.atan(action.y/(-action.x))*57.29577951308
                // )
            }   
    default: return state
    }
}
export const positionXYCreatore = (x,y)=>({
    type:POSITION_X_Y,
    x,
    y
})
export const positionXY = (x,y)=>(dispatch)=>{
    
    dispatch(positionXYCreatore(x,y))
}

export default valueBeginReducer