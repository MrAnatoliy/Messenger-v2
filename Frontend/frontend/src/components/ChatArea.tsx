import { Box, Typography, useTheme } from "@mui/material";
import { IChat, IMessage } from "../store/chatSlice";

import sended from "../static/Sended.svg";
import delivered from "../static/Delivered.svg";
import read from "../static/Viewed.svg";

interface IMessageBox {
  message: IMessage;
  displayTime: boolean;
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
          borderRadius: "15px",
          wordWrap: "break-word", // Enable text wrapping
          maxWidth: "35%", // Set maximum width to allow wrapping
        }}
      >
        {props.message.content}
      </Box>

      {props.displayTime ? (
        <Box color="primary.main">{messageTime}</Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

const SelfMessage = (props: IMessageBox) => {
  const messageStatus = props.message.message_status;
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {props.displayTime ? (
          <Box color="primary.main">{messageTime}</Box>
        ) : (
          <></>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {messageStatus === "sended" ? (
            <>
              <img width={16 * 0.75} src={sended} alt="sended" />
            </>
          ) : (
            <></>
          )}
          {messageStatus === "delivered" ? (
            <>
              <img width={36 * 0.75} src={delivered} alt="delivered" />
            </>
          ) : (
            <></>
          )}
          {messageStatus === "read" ? (
            <>
              <img width={56 * 0.75} src={read} alt="read" />
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          paddingY: 1,
          paddingX: 2,
          marginLeft: 1,
          backgroundColor: "primary.main",
          fontSize: "16px",
          color: "white",
          borderRadius: "15px",
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
      chatArray.push(<DateLine key={index + "date"} date={messageDate} />);
    }

    let displaySelfMessagesTime = true;
    let displaySenderMessagesTime = true;

    if (index >= 1) {
      const prevMessageDate = new Date(chatData[index - 1].time);

      const messageDateString = messageDate.toISOString().slice(0, 10);
      const prevMessageDateString = prevMessageDate.toISOString().slice(0, 10);

      if (messageDateString !== prevMessageDateString) {
        chatArray.push(<DateLine key={index + "date"} date={messageDate} />);
      }
    }

    if (index < chatData.length - 1) {
      const nextMessage = chatData[index + 1];
      const nextMessageDate = new Date(nextMessage.time);

      const messageTimeString = messageDate.toISOString().slice(11, 16);
      const nextMessageTimeString = nextMessageDate.toISOString().slice(11, 16);

      if (messageTimeString === nextMessageTimeString) {
        if (message.sender === nextMessage.sender) {
          if (message.sender.contact_name === "me") {
            displaySelfMessagesTime = false;
          } else {
            displaySenderMessagesTime = false;
          }
        }
      }
    } else {
      displaySelfMessagesTime = true;
      displaySenderMessagesTime = true;
    }

    if (message.sender.contact_name === "me") {
      chatArray.push(
        <SelfMessage
          key={index}
          displayTime={displaySelfMessagesTime}
          message={message}
        />
      );
    } else {
      chatArray.push(
        <SenderMessage
          key={index}
          displayTime={displaySenderMessagesTime}
          message={message}
        />
      );
    }
  });

  return <Box>{chatArray}</Box>;
};

export default ChatArea;
