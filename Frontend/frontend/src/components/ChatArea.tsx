import { Box, Typography, useTheme } from "@mui/material";
import { IChat, IMessage } from "../store/chatSlice";

interface IMessageBox {
  message: IMessage;
}

const SenderMessage = (props: IMessageBox) => {
  const messageDate = new Date(props.message.time);
  const messageTime =
    messageDate.getHours() +
    ":" +
    (messageDate.getMinutes() === 0 ? "00" : messageDate.getMinutes());

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        margin: 2,
      }}
    >
      <Box
        sx={{
          paddingY: 1,
          paddingX: 2,
          marginRight: 1,
          backgroundColor: "secondary.main",
          fontSize: "16px",
          color: "white",
          borderRadius: "20px",
          wordWrap: "break-word", // Enable text wrapping
          maxWidth: "35%", // Set maximum width to allow wrapping
        }}
      >
        {props.message.content}
      </Box>
      <Box color="primary.main">{messageTime}</Box>
    </Box>
  );
};

const SelfMessage = (props: IMessageBox) => {
    const messageDate = new Date(props.message.time);
    const messageTime =
      messageDate.getHours() +
      ":" +
      (messageDate.getMinutes() === 0 ? "00" : messageDate.getMinutes());
  
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          margin: 2,
        }}
      >
        <Box color="primary.main">{messageTime}</Box>
        <Box
          sx={{
            paddingY: 1,
            paddingX: 2,
            marginLeft: 1,
            backgroundColor: "primary.main",
            fontSize: "16px",
            color: "white",
            borderRadius: "20px",
            wordWrap: "break-word", // Enable text wrapping
            maxWidth: "35%", // Set maximum width to allow wrapping
          }}
        >
          {props.message.content}
        </Box>
      </Box>
    );
};

interface IDateLine {
  date: Date;
}

const DateLine = (props: IDateLine) => {
  const nowDate = new Date();
  const date = props.date;

  const isToday =
    date.getDate() === nowDate.getDate() &&
    date.getMonth() === nowDate.getMonth() &&
    date.getFullYear() === nowDate.getFullYear();
  const addYear = date.getFullYear() !== nowDate.getFullYear();

  let dateText = "";

  if (isToday) {
    dateText = "Today";
  } else {
    dateText =
      date.getDate() + " " + date.toLocaleString("en", { month: "long" });
    dateText += addYear ? " " + date.getFullYear() : "";
  }

  const theme = useTheme();

  return (
    <Box
      paddingY={2}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "50%",
          borderTop: `1px solid ${theme.palette.primary.light}`,
          zIndex: 0,
          transform: "translateY(-50%)",
        }}
      />
      <Typography
        color="primary.main"
        style={{ zIndex: 1, backgroundColor: "#fff", padding: "0 8px" }}
      >
        {dateText}
      </Typography>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          right: 0,
          width: "50%",
          borderTop: `1px solid ${theme.palette.primary.light}`,
          zIndex: 0,
          transform: "translateY(-50%)",
        }}
      />
    </Box>
  );
};

const NewMessagesLine = () => {
  const theme = useTheme();

  return (
    <Box
      paddingY={2}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "50%",
          borderTop: `1px solid ${theme.palette.success.light}`,
          zIndex: 0,
          transform: "translateY(-50%)",
        }}
      />
      <Typography
        color="success.light"
        style={{ zIndex: 1, backgroundColor: "#fff", padding: "0 8px" }}
      >
        New messages
      </Typography>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          right: 0,
          width: "50%",
          borderTop: `1px solid ${theme.palette.success.light}`,
          zIndex: 0,
          transform: "translateY(-50%)",
        }}
      />
    </Box>
  );
};

interface IChatArea {
  chat: IChat;
}

const ChatArea = (props: IChatArea) => {
  const activeChat: IChat = props.chat;
  let chatData: IMessage[] = [];

  if (activeChat && activeChat.messages !== null) {
    chatData = [...activeChat.messages]; // Make a copy of activeChat.messages
  }

  chatData.sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  const chatArray: any[] = [];
  chatData.forEach((message, index) => {
    const messageDate = new Date(message.time);

    if (index === 0) {
      chatArray.push(<DateLine date={messageDate} />);
    }

    if (message.sender.contact_name === "me") {
      chatArray.push(<SelfMessage message={message} />);
    } else {
      chatArray.push(<SenderMessage message={message} />);
    }

    if (index !== chatData.length - 1) {
      const nextMessageDate = new Date(chatData[index + 1].time);
      const messageDateString = messageDate.toISOString().slice(0, 10);
      const nextMessageDateString = nextMessageDate.toISOString().slice(0, 10);
      if (messageDateString !== nextMessageDateString) {
        chatArray.push(<DateLine date={nextMessageDate} />);
      }
    }
  });

  return <Box>{chatArray}</Box>;
};

export default ChatArea;
