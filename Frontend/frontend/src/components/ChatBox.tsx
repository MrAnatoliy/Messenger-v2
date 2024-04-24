import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  IChat,
  getAllContacts,
  selectChats,
  selectMyself,
} from "../store/chatSlice";
import { Box, List } from "@mui/material";
import ChatCard from "./ChatCard";
import { selectUser } from "../store/authSlice";
import { useEffect } from "react";

const ChatBox = () => {
  const dispatch = useAppDispatch();
  const chatsData = useAppSelector(selectChats);
  const myself = useAppSelector(selectMyself);
  const token = useAppSelector(selectUser)?.token;

  let chats = null;

  if (chatsData) {
    if (chatsData.length > 0) {
      chats = chatsData.map((mapped_chat: IChat, index) => (
        <ChatCard key={index} chat={mapped_chat} />
      ));
    }
  } else {
    chats = <li>No chats</li>;
  }

  useEffect(() => {
    dispatch(
      getAllContacts({ userId: myself?.contact_id || 0, token: token || "" })
    );
  }, [dispatch, myself?.contact_id, token]);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <List
        sx={{
          width: "100%",
        }}
      >
        {chats}
      </List>
    </Box>
  );
};

export default ChatBox;
