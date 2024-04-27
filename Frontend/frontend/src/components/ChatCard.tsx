import default_contact_round from "../static/default_contact_round.png";
import { IChat, setActiveChat } from "../store/chatSlice";
import { Box, ListItem, ListItemButton, Typography } from "@mui/material";
import { useAppDispatch } from "../store/hooks";

interface IChatCard {
  chat: IChat;
}

const ChatCard = (props: IChatCard) => {
  let lastMessage, lastMessageTime;

  const dispatcher = useAppDispatch();

  if (props.chat.messages) {
    const messages = props.chat.messages;
    if (messages[messages.length - 1]) {
      let messageContent = messages[messages.length - 1].content || "";

      const lastMessageTimeConst = messages[messages.length - 1].time;

      if (lastMessageTimeConst) {
        const lastMessageDate = new Date(lastMessageTimeConst);

        lastMessageTime =
          lastMessageDate.getHours() +
          ":" +
          (lastMessageDate.getMinutes() === 0
            ? "00"
            : lastMessageDate.getMinutes()) +
          " | " +
          lastMessageDate.getDate() +
          " " +
          lastMessageDate.toLocaleString("en", { month: "short" });
      }
      lastMessage = messageContent;
    }
  }

  return (
    <ListItem
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <ListItemButton
        sx={{
          width: "100%",
        }}
        onClick={() => {
          dispatcher(setActiveChat(props.chat));
        }}
      >
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
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography color="secondary.main" fontWeight={700} variant="h6">
            {props.chat.sender.contact_name}
          </Typography>
          {props.chat.messages ? (
            <>
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                fontSize={16}
                color="primary.main"
              >
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
