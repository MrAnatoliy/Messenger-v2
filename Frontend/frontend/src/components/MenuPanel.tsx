import {
  PeopleAltRounded,
  Search,
  SettingsRounded,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useAppDispatch } from "../store/hooks";
import { setActivePage } from "../store/chatSlice";

const MenuPanel = () => {

  const dispatcher = useAppDispatch()

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
        '&:hover': {
          backgroundColor: 'white',
          '& .MuiSvgIcon-root': {
            color: 'secondary.contrastText',
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
        '&:hover': {
          backgroundColor: 'white',
          '& .MuiSvgIcon-root': {
            color: 'secondary.contrastText',
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
        '&:hover': {
          backgroundColor: 'white',
          '& .MuiSvgIcon-root': {
            color: 'secondary.contrastText',
          },
        },
      }}
      aria-label="save"
    >
      <SettingsRounded sx={{ color: "primary.main", fontSize: 32 }} />
    </IconButton>
    </Box>
  );
};

export default MenuPanel;
