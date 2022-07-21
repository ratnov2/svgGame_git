import Dialogs from "./Dialogs"
import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer"

function Test(){
    //const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    //const [wsChannel,setWsChannel] = useState(null)
   
   const dispatch = useDispatch()
   
    useEffect(()=>{
        dispatch(startMessagesListening())
        return ()=>{
            dispatch(stopMessagesListening())
        }
    },[])
    return <Dialogs />
}

export default Test