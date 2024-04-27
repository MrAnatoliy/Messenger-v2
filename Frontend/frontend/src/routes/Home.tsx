import { Grid, useTheme } from "@mui/material";
import UserCard from "../components/UserCard";
import ChatBox from "../components/ChatBox";
import ChatHeader from "../components/ChatHeader";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  WSConnectionOpen,
  selectActiveChat,
  selectActivePage,
  selectWSConnection,
} from "../store/chatSlice";
import MenuPanel from "../components/MenuPanel";
import ChatInputField from "../components/ChatInputField";
import ChatArea from "../components/ChatArea";
import PeopleBox from "../components/PeopleBox";
import SettingsBox from "../components/SettingsBox";
import { useEffect } from "react";
import { connect, subscribeToMessages } from "../util/WebSocketService";

const Home = () => {
  const activeChat = useAppSelector(selectActiveChat);
  const activePage = useAppSelector(selectActivePage);
  const WSConnection = useAppSelector(selectWSConnection);
  const theme = useTheme();

  useEffect(() => {
    if (WSConnection === "closed") {
      connect()
        .then(() => {
          setTimeout(subscribeToMessages, 1000);
        })
        .catch((error) => {
          console.log("Error to subscribing to messages : ", error);
        });
    }
  }, []);

  const setActivePage = () => {
    let pageBox;
    switch (activePage) {
      case "chats":
        pageBox = <ChatBox />;
        break;
      case "people":
        pageBox = <PeopleBox />;
        break;
      case "settings":
        pageBox = <SettingsBox />;
        break;

      default:
        pageBox = <ChatBox />;
        break;
    }

    return pageBox;
  };

  return (
    <>
      <Grid container>
        <Grid
          sx={{ backgroundColor: "#F2F7F9" }}
          display="flex"
          flexDirection="column"
          item
          xs={4}
          height="100vh"
        >
          <Grid display="flex" justifyContent="center" alignItems="center" item>
            <UserCard />
          </Grid>
          <Grid display="flex" justifyContent="flex-start" flexGrow={1} item>
            {setActivePage()}
          </Grid>
          <Grid item>
            <MenuPanel />
          </Grid>
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={8} height="100vh">
          {activeChat ? (
            <>
              <Grid
                display="flex"
                justifyContent="center"
                alignItems="center"
                item
              >
                <ChatHeader chat={activeChat} />
              </Grid>
              <Grid style={{ overflowY: "auto" }} flexGrow={1} item>
                {" "}
                <style>
                  {`
                    ::-webkit-scrollbar {
                      width: 10px;
                    }
                    ::-webkit-scrollbar-thumb {
                      background-color: ${theme.palette.secondary.main};
                    }
                    ::-webkit-scrollbar-button {
                      display: none;
                    }
                 `}
                </style>
                <ChatArea chat={activeChat} />
              </Grid>
              <Grid item>
                <ChatInputField />
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
