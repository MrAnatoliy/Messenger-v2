import default_contact_round from "../static/default_contact_round.png";
import { IChat, IContact, IResponseUser, addToContact, setActiveChat } from "../store/chatSlice";
import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import useWindowDimensions, { useAppDispatch, useAppSelector } from "../store/hooks";
import { AddRounded } from "@mui/icons-material";
import { selectUser } from "../store/authSlice";

interface IPeopleCard {
  contact : IResponseUser
}

const PeopleCard = (props : IPeopleCard) => {

  const dispatch = useAppDispatch()
  const token = useAppSelector(selectUser)?.token || ""

  return (
    <ListItem sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}>
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
            marginRight: 2,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              outline: `4px solid`,
              //color: props.chat.sender.status + ".main",
              //opacity: props.chat.sender.status !== "offline" ? 1 : 0, //TODO - add a status to user in backend
              opacity: 0,
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            component="img"
            width={60}
            sx={{
              content: `url(${default_contact_round})`,
            }}
            alt="UserPic"
          />
        </Box>
        <Box>
          <Typography color="secondary.main" fontWeight={700} variant="h6">
            {props.contact.userLogin}
          </Typography>
        </Box>
      </Box>
      <IconButton
        onClick={() => {
          dispatch(addToContact({toContactUserId: props.contact.id, token: token}))
        }}
        sx={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          backgroundColor: "primary.main",
          marginX: 1,
          "&:hover": {
            backgroundColor: "primary.dark",
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          },
        }}
        aria-label="save"
      >
        <AddRounded sx={{ color: "white", fontSize: 32 }} />
      </IconButton>
    </ListItem>
  );
};

export default PeopleCard;
