import { SendRounded } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { IMessageRequest, sendMessage, subscribeToMessages } from "../util/WebSocketService";
import { IContact, IMessage, selectActiveChat, selectMyself } from "../store/chatSlice";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/authSlice";

const ChatInputField = () => {

  const [message,setMessage] = useState("")
  const myself = useAppSelector(selectMyself)
  const recipeint = useAppSelector(selectActiveChat)?.sender;
  
  return (
    <Box
      sx={{
        height: "55px",
        backgroundColor: "primary.main",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MessageInputField message={message} setMessage={setMessage} />
      <IconButton
        onClick={() => {
          if(myself && recipeint){
          const toSendMessage : IMessageRequest = {
            senderId: myself.contact_id,
            recipientId : recipeint.contact_id,
            time : new Date().toISOString(),
            content : message,
            status : "sended",
          }
          console.log(toSendMessage)
          sendMessage(toSendMessage)
          
        }
        }}
        sx={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          backgroundColor: "white",
          marginX: 1,
          "&:hover": {
            backgroundColor: "white",
            "& .MuiSvgIcon-root": {
              color: "secondary.contrastText",
            },
          },
        }}
        aria-label="save"
      >
        <SendRounded sx={{ color: "primary.main", fontSize: 32 }} />
      </IconButton>
    </Box>
  );
};

interface IMessageInput {
  message : string,
  setMessage : any
}

const MessageInputField = (props : IMessageInput) => {
  return (
    <TextField
      value={props.message}
      onChange={(e) => props.setMessage(e.target.value)}
      autoComplete="off"
      type="text"
      sx={{
        backgroundColor: "white",
        height: "40px",
        width: "75%",
        padding: 0,
        borderRadius: "10px",
        justifyContent: "center",
        "& .MuiInputBase-root": {
          padding: 0,
          borderRadius: "10px",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            height: "40px",
            border: "none",
            padding: 0,
            borderRadius: "10px",
          },
          "&:hover fieldset": {
            border: "none",
          },
          "&.Mui-error:hover fieldset": {
            border: "none",
          },
          "& input": {
            color: "primary.main",
            textJustify: "center",
            paddingY: 0,
          },
          "&.Mui-error input": {
            color: "error.main",
          },
        },
      }}
      placeholder="Type message here"
    />
  );
};

export default ChatInputField;
