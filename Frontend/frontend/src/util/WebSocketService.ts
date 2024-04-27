import { enqueueSnackbar } from "notistack";
import { selectUser } from "../store/authSlice";
import {
  IMessage,
  WSConnectionFail,
  WSConnectionOpen,
  getAllContacts,
  selectActiveChat,
  setActiveChat,
  updateActiveChat,
} from "../store/chatSlice";
import { store } from "../store/store";

const WS_CONNECTION_URL = process.env.REACT_APP_WS_CONNECTION_URL;

export let client: any;

export const connect = () => {
  return new Promise((resolve: any, reject) => {
    var Stomp = require("stompjs");
    client = Stomp.client(WS_CONNECTION_URL || "");
    client.connect(
      {},
      () => {
        onConnect();
        resolve(); // Resolve the promise when connected successfully
      },
      onError
    );
  });
};

const onConnect = () => {
  store.dispatch(WSConnectionOpen());
};

const onError = () => {
  store.dispatch(WSConnectionFail());
};

export const subscribeToMessages = () => {
  const userId = selectUser(store.getState())?.id;
  client.subscribe("/user/" + userId + "/queue/messages", onMessageRecieved);

  client.subscribe(
    "/user/" + userId + "/queue/messageResponse",
    onMessageResponseRecieved
  );
};

interface IChatNotification {
  userId: number;
  userName: string;
  message: string;
}

const onMessageRecieved = (message: any) => {
  const notification = JSON.parse(message.body);
  const activeChat = selectActiveChat(store.getState());
  const user = selectUser(store.getState());

  store.dispatch(
    getAllContacts({ userId: user?.id || 0, token: user?.token || "" })
  );
  if (activeChat?.sender.contact_id === notification.userId) {
  } else {
    console.log("Message going in non active chat");
    message = notification.userName + " : " + notification.message;
    console.log(notification)
    enqueueSnackbar(notification.message, {
      variant: "chatNotification",
      id: message,
      username: notification.userName,
      message: notification.message,
    });
  }
};

const onMessageResponseRecieved = (message: any) => {
  const user = selectUser(store.getState());
  if (user) {
    store.dispatch(
      getAllContacts({ userId: user.id, token: user.token})
    );
    console.log("Message has been sended. Dispatching new messages...");
  }
};

export interface IMessageRequest {
  senderId: number;
  recipientId: number;
  time: string;
  content: string;
  status: string;
}

export const sendMessage = (message: IMessageRequest) => {
  if (message.content.trim() !== "") {
    client.send("/app/chat", {}, JSON.stringify(message));
  }
};
