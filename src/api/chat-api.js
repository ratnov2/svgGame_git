
let subscribers = {
    'messages-received': [],
    'status-chainged': []
}
let ws = null

const cleanUp = ()=>{
    ws?.removeEventListener('close',closeHandler)
    ws?.removeEventListener('message',messageHandler)
    ws?.removeEventListener('open',openHandler)
    ws?.removeEventListener('error',errorHandler)
}
const closeHandler =()=>{
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel,3000) 
    }

let messageHandler =(e)=>{
     let newMessages = JSON.parse(e.data)
     subscribers['messages-received'].forEach(s=>s(newMessages))

}
let openHandler =()=>{
    notifySubscribersAboutStatus('ready')

}
let errorHandler =()=>{
    notifySubscribersAboutStatus('error')

}
function createChannel(){
        cleanUp()
        ws?.close()
        ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        notifySubscribersAboutStatus('pending')
        ws?.addEventListener('close',closeHandler)
        ws.addEventListener('message',messageHandler)
        ws.addEventListener('open',openHandler)
        ws.addEventListener('error',errorHandler)
}

const notifySubscribersAboutStatus = (status)=>{
    subscribers['status-chainged'].forEach(s=>s(status))
}

export const chatAPI ={
    start(){
        createChannel()
    },
    stop(){
        subscribers['messages-received'] = []
        subscribers['status-chainged'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName,callback){
        subscribers[eventName].push(callback)
        return()=>{
            subscribers[eventName] = subscribers[eventName].filter(s=>s !== callback)
        }
    },
    unsubscribe(eventName,callback){
        subscribers[eventName] = subscribers[eventName].filter(s=>s !== callback)
    },
    sendMessage(message){
        ws?.send(message)
    }
}