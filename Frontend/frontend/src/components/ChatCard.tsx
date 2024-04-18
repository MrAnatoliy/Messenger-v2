import default_contact_round from "../static/default_contact_round.png";
import { IChat, setActiveChat } from "../store/chatSlice";
import {
  Box,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import useWindowDimensions, { useAppDispatch } from "../store/hooks";

interface IChatCard {
  chat: IChat;
}

const ChatCard = (props: IChatCard) => {
    
  let lastMessage, lastMessageTime;

  const dispatcher = useAppDispatch()
  const screenWidth = useWindowDimensions().width


  if (props.chat.messages) {
    if (props.chat.messages.at(0)) {

      const sender = props.chat.messages.at(0)?.sender.contact_name;
      const messageContent = props.chat.messages.at(0)?.content;

      const lastMessageTimeConst = props.chat.messages[0]?.time;

      if (lastMessageTimeConst) {
        const lastMessageDate = new Date(lastMessageTimeConst);

        lastMessageTime = lastMessageDate.getHours() +
        ":" +
        (lastMessageDate.getMinutes() === 0
          ? "00"
          : lastMessageDate.getMinutes()) +
        " | " +
        lastMessageDate.getDay() +
        " " +
        lastMessageDate.toLocaleString("en", { month: "short" })
      }

      const LargeScreenText = 35
      const MediumScreenText = 20
      const SmallScreenText = 10

      let screenText = 35

      if(screenWidth >= 1448) screenText = LargeScreenText
      else if(screenWidth < 1448 && screenWidth >= 1035) screenText = MediumScreenText
      else screenText = SmallScreenText

      if(screenText <= MediumScreenText){
        lastMessage = ": " + messageContent;

      }else{
        lastMessage = sender + ": " + messageContent;
      }

      if (lastMessage.length > screenText) {
        lastMessage = lastMessage.substring(0, screenText) + "...";
      }
    }
  }

  return (
    <ListItem>
      <ListItemButton onClick={() => dispatcher(setActiveChat(props.chat))} >
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
              color: props.chat.sender.status + ".main",
              opacity: props.chat.sender.status !== "offline" ? 1 : 0,
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
            {props.chat.sender.contact_name}
          </Typography>
          {props.chat.messages ? (
            <>
              <Typography fontSize={16} color="primary.main">
                {lastMessage}
              </Typography>
              <Typography fontSize={14} color="primary.main">
                {lastMessageTime}
              </Typography>
            </>
          ) : (
            <></>
          )}
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default ChatCard;
