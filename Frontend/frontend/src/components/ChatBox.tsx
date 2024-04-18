import { useAppSelector } from "../store/hooks";
import { IChat, selectChats } from "../store/chatSlice";
import { Box, List } from "@mui/material";
import ChatCard from "./ChatCard";

const ChatBox = () => {

  const chatsData = useAppSelector(selectChats);

  let chats = null;

  if (chatsData) {
    if (chatsData.length > 0) {
      chats = chatsData.map((mapped_chat : IChat, index) => (
        <ChatCard key={index} chat={mapped_chat}/>
      ));
    }
  } else {
    chats = <li>No chats</li>;
  }

  return (
    <Box>
      <List>
        {chats}
      </List>
    </Box>
  );
};

export default ChatBox;
