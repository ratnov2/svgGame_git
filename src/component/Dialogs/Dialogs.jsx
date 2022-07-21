import React from "react"
import { useState } from "react"

import { useRef } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendMessage } from "../../redux/chat-reducer"



function Dialogs(){
    const status = useSelector(state=>state.chat.status)
    return(
       
        <div> 
             {status === 'error' && <div>Some occurepted</div>}
             <>
                <Messages />
                <AddMessageForm />
            </>
        </div>
    )
}


const Messages =()=>{
    let messages = useSelector(state=> state.chat.messages)
    const messagesAnchorRef = useRef(null)
    const [isAutoScroll,setIsAutoScroll] = useState(false)
    const scrollHandler = (e)=>{
        const element = e.currentTarget
        if(Math.abs((element.scrollHeight-element.scrollTop)-element.clientHeight)<300)
        {
           !isAutoScroll && setIsAutoScroll(true)
        }else{
            isAutoScroll && setIsAutoScroll(false)
        }
    }
    useEffect(()=>{
        if(isAutoScroll){
        messagesAnchorRef.current?.scrollIntoView({behavior:'smooth'})
        }

    },[messages])
    return <div style={{height:'400px',overflowY: 'auto'}} onScroll={scrollHandler}>
       {messages.map((m , index)=><Message key={m.id} message={m}/>)}
       <div ref={messagesAnchorRef}></div>
    </div>
}

const Message = React.memo(({message})=>{
    
    return <div>
        <img src={message.photo} alt="" /><b>{message.userName}</b>
        <br />
       {message.message}
    </div>
})
const AddMessageForm = ()=>{
    const [message,setMessage] = useState('')
    let dispatch = useDispatch()
    const status = useSelector(state=>state.chat.status)
    const sendMessageHandler = ()=>{
       if(!message){
           return
       }
       dispatch(sendMessage(message))
        setMessage('')
    }
    return <div>
        <div>
            <textarea onChange = {(e)=>{setMessage(e.currentTarget.value)}} name="" ></textarea>
        </div>
        <div>
            <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}
export default Dialogs