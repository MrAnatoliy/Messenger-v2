import {
  PeopleAltRounded,
  Search,
  SettingsRounded,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

const MenuPanel = () => {
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
