import { SendRounded } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import React from "react";

const ChatInputField = () => {
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
      <MessageInputField />
      <IconButton
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

const MessageInputField = () => {
  return (
    <TextField
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
