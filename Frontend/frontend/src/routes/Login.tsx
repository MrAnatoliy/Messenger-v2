import { useState } from "react";
import Page from "../components/Page";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  IAuthRequest,
  authenticate,
  selectLoading,
  selectMessage,
} from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Login = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectLoading)
  const message = useAppSelector(selectMessage)

  const [username , setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <Page enableAuthButtons={false}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          width: 3 / 5,
        }}
      >
        <Typography
          color={"secondary.contrastText"}
          sx={{
            paddingBottom: 3,
          }}
          variant="h3"
        >
          Login
        </Typography>
        <TextField
          fullWidth
          sx={{
            width: "80%",
          }}
          margin="normal"
          variant="outlined"
          label="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          error= {loading === 'failed'}
          fullWidth
          sx={{
            width: "80%",
          }}
          margin="normal"
          variant="outlined"
          label= "password"
          helperText= {loading === 'failed' ? message : ""}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          variant="contained"
          sx={{
            marginTop: 1,
            marginBottom: 5,
            width: "150px",
            textTransform: "none",
          }}
          onClick={() => {
            const user: IAuthRequest = {
              email: username,
              password: password,
            };
            dispatch(authenticate(user));
          }}
        >
          Get in
        </Button>
      </Box>
    </Page>
  );
};

export default Login;
