import { Close } from "@mui/icons-material";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { SnackbarContent, useSnackbar } from "notistack";
import React from "react";
import defaultContact from "../static/default_contact_round.png";

interface chatNotificationProps {
  id: string;
  username: string;
  message: string;
}

export const ChatNotification = React.forwardRef<
  HTMLDivElement,
  chatNotificationProps
>((props, ref) => {
  const { closeSnackbar } = useSnackbar();
  const handleCloseSnackbar = () => closeSnackbar(props.id);

  return (
    <SnackbarContent ref={ref} role="notification">
      <Container>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F2F7F9",
          borderRadius: "15px",
          justifyContent: "space-between",
          paddingY: 1,
          paddingX: 3,
        }}>
          <Box
            component="img"
            width={60}
            sx={{
              content: `url(${defaultContact})`,
            }}
            alt="UserPic"
          />
          <Box>
            <Typography fontWeight={700} color="secondary.main">{props.username}</Typography>
            <Typography fontWeight={300} color="primary.main">{props.message}</Typography>
          </Box>
          <IconButton onClick={handleCloseSnackbar}>
            <Close />
          </IconButton>
        </Box>
      </Container>
    </SnackbarContent>
  );
});

declare module "notistack" {
  interface VariantOverrides {
    // adds `myCustomVariant` variant
    myCustomVariant: true;
    // adds `reportComplete` variant and specifies the
    // "extra" props it takes in options of `enqueueSnackbar`
    chatNotification: {
      id: string;
      username: string;
      message: string;
    };
  }
}
