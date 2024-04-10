import { Box, Button } from "@mui/material";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import IHeaderProps from "../interface/IHeaderProps";

const Header = (props : IHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        p: 3,
      }}
    >
      <Logo color="primary.main" />
      {props.enableAuthButtons ? (
        <>
          <Box>
            <Button
              onClick={() => navigate("login")}
              sx={{ textTransform: "none", marginRight: 1, }}
              variant="contained"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("register")}
              sx={{ textTransform: "none" }}
              variant="contained"
            >
              Register
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Header;
