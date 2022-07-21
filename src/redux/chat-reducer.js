import { chatAPI } from "../api/chat-api"
import {v1} from 'uuid'

let initialState={
    messages:[],
    status: 'pending'
}

const ChatReducer = (state=initialState,action)=>{
    switch (action.type){
        case 'MESSAGES_RECEIVED':
            return{
                ...state,
                messages:[...state.messages,...action.payload.map(m=>({...m,id:v1()}))].filter((m,index,array)=> index>= array.length-100)
            }
        case 'STATUS_CHANGE':
            return{   
                ...state,
                status:action.payload
            }
        default: 
            return state
    }
}
let _newMessageHandler = null
const newMessageHandlerCreator = (dispatch)=>{ 
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages)=>{
            dispatch(actions.messageReceived(messages))}
    }
    return _newMessageHandler
}

let _statusChangedHandler = null
const statusChangedHandlerCreator = (dispatch)=>{ 
    if(_statusChangedHandler === null) {
        _statusChangedHandler = (status)=>{
            dispatch(actions.statusChanged(status))}
    }
    return _statusChangedHandler
}

export const actions = {
    statusChanged:(status)=>({
        type: 'STATUS_CHANGE', payload:status
    }),
    messageReceived:(messages)=>({
        type: 'MESSAGES_RECEIVED', payload:messages
    })
}
export const startMessagesListening = ()=>async(dispatch)=>{
    chatAPI.start()
    chatAPI.subscribe('messages-received',newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-chainged',statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = ()=>async(dispatch)=>{
    chatAPI.unsubscribe('messages-received',newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-chainged',statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message)=>async(dispatch)=>{
    chatAPI.sendMessage(message)
}
export default ChatReducer