import { Box, Typography } from "@mui/material";
import React from "react";
import { IChat } from "../store/chatSlice";

interface IChatHeader {
  chat: IChat;
}

const ChatHeader = (props: IChatHeader) => {
  const lastOnlineDate = new Date(props.chat.sender.last_online);
  const lastOnline =
    "Last time online " +
    lastOnlineDate.getHours() +
    ":" +
    (lastOnlineDate.getMinutes() === 0 ? "00" : lastOnlineDate.getMinutes()) +
    " | " +
    lastOnlineDate.getDay() +
    " " +
    lastOnlineDate.toLocaleString("en", { month: "short" });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingY: 2,
      }}
    >
      <Typography color="secondary.main" fontWeight={700} variant="h4">
        {props.chat.sender.contact_name}
      </Typography>
      {props.chat.sender.status === "offline" ? (
        <>
          <Typography color="primary.main">{lastOnline}</Typography>
        </>
      ) : (
        <>
          <Typography color={props.chat.sender.status + ".dark"}>
            {props.chat.sender.status}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ChatHeader;
