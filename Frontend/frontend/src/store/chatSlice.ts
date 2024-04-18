import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface IContact {
  contact_name: string;
  last_online: string;
  unread: number;
  status: "online" | "offline" | "doNotDisturb" | "away";
}

export interface IMessage {
  sender: IContact;
  time: string;
  message_status: "sended" | "delivered" | "read";
  content: string; //TODO - make a content an object with separate text and files like images/videos/files e.t.c.
}

export interface IChat {
  sender: IContact;
  messages: Array<IMessage> | null;
}

export interface INotification {
  sender: IContact;
  message: string;
}

export interface IChatSlice {
  ws_connection: boolean;
  loading: "idle" | "pending" | "failed" | "succeeded";
  message: string | null;
  chats: Array<IChat> | null;
  activeChat : IChat | null;
}

const myself: IContact = {
    contact_name: "me",
    last_online: new Date().toISOString(),
    unread: 0,
    status: "online"
}

const gosha: IContact = {
  contact_name: "Georgeous",
  last_online: new Date(2024, 3, 17, 18, 0, 0, 0).toISOString(),
  unread: 0,
  status: "offline",
};

/**
const initialState : IChatSlice = {
    ws_connection: false,
    loading: "idle",
    message: null,
    chats: null,
    activeChat: null,
}
*/

//FIXME - Implement proper contact and message fetching

const initialState: IChatSlice = {
  ws_connection: false,
  loading: "idle",
  message: null,
  chats: [
    {
      sender: gosha,
      messages: [
        {
          sender: gosha,
          time: new Date(2024, 3, 17, 18, 0, 0, 0).toISOString(),
          message_status: "read",
          content: "Вообщем давай, вацок, отдыхай",
        },
        {
          sender: myself,
          time: new Date(2024, 3, 17, 17, 59, 45, 0).toISOString(),
          message_status: "read",
          content: "Вот ты пидр ёпта",
        },
        {
          sender: myself,
          time: new Date(2024, 3, 17, 17, 59, 32, 0).toISOString(),
          message_status: "read",
          content: "Внатуре чёрт!!!",
        },
      ],
    },
    {
      sender: {
        contact_name: "Povidloid",
        last_online: new Date(2024, 3, 17, 18, 0, 0, 0).toISOString(),
        unread: 0,
        status: "away",
      },
      messages: null,
    },
  ],
  activeChat: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    establishingWSConnection: (state) => {
      state.loading = "pending";
    },
    failedEstablishWSConnection: (state) => {
      state.loading = "failed";
      state.ws_connection = false;
    },
    succeedEstablishingWSConnection: (state) => {
      state.loading = "succeeded";
      state.ws_connection = true;
    },
    setActiveChat: (state, action: PayloadAction<IChat>) => {
        state.activeChat = action.payload
    },
  },
});

export const {
  establishingWSConnection,
  failedEstablishWSConnection,
  succeedEstablishingWSConnection,
  setActiveChat,
} = chatSlice.actions;

export const selectChats = (state : RootState) => state.chat.chats

export default chatSlice.reducer;
