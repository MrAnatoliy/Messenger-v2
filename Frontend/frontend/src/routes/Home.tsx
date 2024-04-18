import { Grid } from "@mui/material";
import UserCard from "../components/UserCard";
import ChatBox from "../components/ChatBox";
import ChatHeader from "../components/ChatHeader";
import { useAppSelector } from "../store/hooks";
import { selectActiveChat } from "../store/chatSlice";
import MenuPanel from "../components/MenuPanel";
import ChatInputField from "../components/ChatInputField";
import ChatArea from "../components/ChatArea";

const Home = () => {

  const activeChat = useAppSelector(selectActiveChat)

  return (
    <>
      <Grid container>
        <Grid sx={{backgroundColor: "#F2F7F9"}} display="flex" flexDirection="column" item xs={4} height="100vh">
                <Grid display="flex" justifyContent="center" alignItems="center" item><UserCard/></Grid>
                <Grid display="flex" justifyContent="flex-start" flexGrow={1} item><ChatBox/></Grid>
                <Grid item><MenuPanel/></Grid>
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={8} height="100vh">
                {activeChat ? 
                <>
                  <Grid display="flex" justifyContent="center" alignItems="center" item><ChatHeader chat={activeChat}/></Grid>
                  <Grid flexGrow={1} item><ChatArea chat={activeChat}/></Grid>
                  <Grid item><ChatInputField/></Grid>
                </>
                 : 
                 <></>}
            </Grid>
      </Grid>
    </>
  );
};

export default Home;
