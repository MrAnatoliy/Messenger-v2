import { Grid } from "@mui/material";
import UserCard from "../components/UserCard";
import ChatBox from "../components/ChatBox";

const Home = () => {
  return (
    <>
      <Grid container height="100vh">
        <Grid item xs={3}>
            <Grid height="100%" container direction="column">
                <Grid display="flex" justifyContent="center" alignItems="center" item xs={2}><UserCard/></Grid>
                <Grid item xs={9}><ChatBox/></Grid>
                <Grid item xs={1}>Menu</Grid>
            </Grid>
        </Grid>
        <Grid item xs={9}>
        <Grid height="100%" container direction="column">
                <Grid item xs={1}>Chat Data</Grid>
                <Grid item xs={10}>Chat</Grid>
                <Grid item xs={1}>InputField</Grid>
            </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
