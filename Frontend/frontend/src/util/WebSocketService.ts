import { selectUser } from "../store/authSlice"
import { WSConnectionFail, WSConnectionOpen, selectActiveChat } from "../store/chatSlice"
import { store } from "../store/store"

const WS_CONNECTION_URL = process.env.REACT_APP_WS_CONNECTION_URL

export let client : any

export const connect = () => {
    return new Promise((resolve : any, reject) => {
        var Stomp = require("stompjs")
        client = Stomp.client(WS_CONNECTION_URL || "")
        client.connect({}, () => {
            onConnect()
            resolve(); // Resolve the promise when connected successfully
        }, onError)
    });
}

const onConnect = () => {
    store.dispatch(WSConnectionOpen())
}

const onError = () => {
    store.dispatch(WSConnectionFail())
}


export const subscribeToMessages = () => {
    const userId = selectUser(store.getState())?.id
    client.subscribe(
        "/user/" + userId + "/queue/messages",onMessageRecieved
    )   
}

interface IChatNotification {
    id : number
    username : string,
    message : string,
}

const onMessageRecieved = (message : any) => {
    const notification : IChatNotification = JSON.parse(message.body)
    const activeChat = selectActiveChat(store.getState())

    if(activeChat?.sender.contact_id === notification.id){
        //save message in corresponding chat and display it there
    } else {
        //pop up notification and make a "new messages" line
    }
}