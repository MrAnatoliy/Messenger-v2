import {
  LogoutRounded,
  PeopleAltRounded,
  Search,
  SettingsRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../store/hooks";
import { resetChatSlice, setActivePage } from "../store/chatSlice";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MenuPanel = () => {
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  return (
    <Box
      sx={{
        height: "55px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "primary.main",
        paddingY: 1,
      }}
    >
      <IconButton
        onClick={() => dispatcher(setActivePage("chats"))}
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
        <PeopleAltRounded sx={{ color: "primary.main", fontSize: 32 }} />
      </IconButton>
      <IconButton
        onClick={() => dispatcher(setActivePage("people"))}
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
        <Search sx={{ color: "primary.main", fontSize: 32 }} />
      </IconButton>
      <IconButton
        onClick={() => dispatcher(setActivePage("settings"))}
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
        <SettingsRounded sx={{ color: "primary.main", fontSize: 32 }} />
      </IconButton>
      <IconButton
        onClick={() => {
          setOpenLogoutDialog(true);
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
        <LogoutRounded sx={{ color: "primary.main", fontSize: 32 }} />
      </IconButton>
      <Dialog
        onClose={() => setOpenLogoutDialog(false)}
        open={openLogoutDialog}
      >
        <DialogTitle>
          <Typography color="secondary.contrastText" variant="h5" fontWeight={700}>
            Are you sure you want to logout?
          </Typography>
          <Box sx={{
            paddingY: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}>
            <Button onClick={() => {
              dispatcher(logout())
              navigate("/login")
              dispatcher(resetChatSlice())
              }} color="primary" variant="contained">Yes</Button>
            <Button onClick={() => {setOpenLogoutDialog(false)}} color="error" variant="contained">No</Button>
          </Box>
        </DialogTitle>
      </Dialog>
    </Box>
  );
};

export default MenuPanel;
