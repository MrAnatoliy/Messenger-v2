import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, store } from "./store";
import axios from "axios";

export interface IContact {
  contact_id: number;
  contact_name: string;
  last_online: string;
  unread: number;
  status: "online" | "offline" | "doNotDisturb" | "away";
}

export interface IMessage {
  senderId: number;
  recipientId : number;
  time: string;
  status: "sended" | "delivered" | "read";
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
  loading: "closed" | "pending" | "failed" | "opened";
  message: string | null;
  chats: Array<IChat> | null;
  activeChat: IChat | null;
  activePage: "chats" | "people" | "settings";
  myself: IContact | null;
}

const initialState: IChatSlice = {
  ws_connection: false,
  loading: "closed",
  message: null,
  chats: [],
  activeChat: null,
  activePage: "chats",
  myself: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    WSConnectionOpen: (state) => {
      state.loading = "opened";
      state.ws_connection = true;
    },
    WSConnectionClose: (state) => {
      state.loading = "closed";
      state.ws_connection = false;
    },
    WSConnectionFail: (state) => {
      state.loading = "failed";
      state.message = "Failed to establish ws connection";
      state.ws_connection = false;
    },
    setActiveChat: (state, action: PayloadAction<IChat>) => {
      state.activeChat = action.payload;
    },
    updateActiveChat: (state) => {
      if (state.activeChat && state.chats) {
        //
      }
    },
    setActivePage: (
      state,
      action: PayloadAction<"chats" | "people" | "settings">
    ) => {
      state.activePage = action.payload;
    },
    setMyselfContact: (state, action: PayloadAction<IContact>) => {
      state.myself = action.payload;
    },
    addChat: (state, action: PayloadAction<IChat>) => {
      const newChat = action.payload;
      // Check if a chat with the same contact_id already exists
      const existingChatIndex = state.chats?.findIndex(chat => chat.sender.contact_id === newChat.sender.contact_id);
      if (existingChatIndex === -1) {
        state.chats?.push(newChat);
      } else {
        const existingChat = state.chats?.at(existingChatIndex || -1);
        if (existingChat?.messages && newChat.messages) {
          existingChat.messages = newChat.messages;

          if(state.activeChat?.sender.contact_id === existingChat.sender.contact_id){
            state.activeChat = existingChat
          }
        }
      }
    },
    resetChatSlice : (state) => {
      return initialState
    }
  },
});

export const {
  WSConnectionOpen,
  WSConnectionClose,
  WSConnectionFail,
  setActiveChat,
  updateActiveChat,
  setActivePage,
  setMyselfContact,
  addChat,
  resetChatSlice,
} = chatSlice.actions;

export const selectChats = (state: RootState) => state.chat.chats;
export const selectActiveChat = (state: RootState) => state.chat.activeChat;
export const selectActivePage = (state: RootState) => state.chat.activePage;
export const selectWSConnection = (state: RootState) => state.chat.loading;
export const selectMyself = (state: RootState) => state.chat.myself;

export default chatSlice.reducer;

const API_URL = process.env.REACT_APP_API_URL;

export interface IResponseUser {
  id: number;
  email: string;
  userLogin: string;
}

export const getAllPeople = async (token: string) => {
  try {
    const response = await axios.get(API_URL + "chat/people", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data: Array<IResponseUser> = response.data.contacts;
    return data ? data : null;
  } catch (err: any) {
    return null;
  }
};

interface IResponseContact {
  contact: IResponseUser;
  messages: IMessage[];
}

export const getAllContacts = createAsyncThunk(
  "chat/getAllContacts",
  async (
    { userId, token }: { userId: number; token: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = axios.get(API_URL + "chat/messages/" + userId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: Array<IResponseContact> = (await response).data.contacts;
      data.forEach((contact) => {
        dispatch(
          addChat({
            sender: {
              contact_id: contact.contact.id,
              contact_name: contact.contact.userLogin,
              last_online: new Date().toISOString(),
              unread: 0,
              status: "offline",
            },
            messages: contact.messages,
          })
        );
      });
    } catch (err) {
      return null;
    }
  }
);

export const addToContact = createAsyncThunk(
  "chat/addToContact",
  async (
    { toContactUserId, token }: { toContactUserId: number; token: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        API_URL + "chat/people/" + toContactUserId,
        {}, // Empty data since it's a POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: Array<IContact> = response.data;
      data.forEach((contact) => {
        dispatch(
          addChat({
            sender: contact,
            messages: null,
          })
        );
      });
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);
