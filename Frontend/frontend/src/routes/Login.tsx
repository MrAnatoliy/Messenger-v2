import { useCallback, useEffect, useState } from "react";
import Page from "../components/Page";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  IAuthRequest,
  IAuthResponse,
  authSuccess,
  authenticate,
  selectLoading,
  selectMessage,
  selectUser,
} from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Login = () => {

  const cookies = new Cookies()

  const navigate = useNavigate()

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser)
  const loading = useAppSelector(selectLoading)
  const message = useAppSelector(selectMessage)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [loginMessage, setLoginMessage] = useState("");
  const loginValidation = (textValue: string) => {
    if (textValue.length <= 0) {
      setLoginMessage("Login cant be empty");
    } else setLoginMessage("");
  };

  const [passwordMessage, setPasswordMessage] = useState("");
  const passwordValidation = useCallback(
    (textValue: string) => {
      if (textValue.length <= 0) {
        setPasswordMessage("Password cant be empty");
      } else if (loading === "failed") {
        setPasswordMessage(message || "Server error");
      } else setPasswordMessage("");
    },
    [loading, message]
  );  

  const loadDataOnlyOnce = () => {
    const cookieToken = cookies.get('token')
    const cookieAuth = cookies.get('authorities')

    if(cookieToken && cookieAuth){
      const data : IAuthResponse = {
        token: cookieToken,
        message: "Authenticate from cookies",
        roles: cookieAuth,
      }

      dispatch(authSuccess(data))
    }
  }

  useEffect(() => {
    loadDataOnlyOnce();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    loginValidation(username);
    passwordValidation(password);
  }, [username, password, loading, passwordValidation]);

  useEffect(() => {
    if(user?.token && loading === 'succeeded'){
      navigate("/home")
    }
  })

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
          error={loginMessage !== ""}
          fullWidth
          sx={{
            width: "80%",
          }}
          margin="normal"
          variant="outlined"
          label="username"
          helperText={loginMessage}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          error={passwordMessage !== ""}
          fullWidth
          sx={{
            width: "80%",
          }}
          margin="normal"
          variant="outlined"
          label="password"
          helperText={passwordMessage}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? (
                    <Visibility color="primary" />
                  ) : (
                    <VisibilityOff color="primary" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
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
            if (loginMessage.length === 0 && passwordMessage.length === 0) {
              const user: IAuthRequest = {
                email: username,
                password: password,
              };
              loginValidation(username);
              passwordValidation(password);
              dispatch(authenticate(user));
            }
          }}
        >
          Get in
        </Button>
      </Box>
    </Page>
  );
};

export default Login;
