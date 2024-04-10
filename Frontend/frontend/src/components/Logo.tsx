import { Box, Typography } from "@mui/material";
import logo from "../static/logo.svg";
import { Link } from "react-router-dom";

interface LogoProps {
  color: string;
}

const Logo = (props: LogoProps) => {
  return (
    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "horizontal",
        }}
      >
        <img
          id="logo-svg"
          className="w-16 inline-block"
          src={logo}
          alt="logo"
        />
        <Typography
          sx={{
            paddingLeft: 3,
            color: props.color,
          }}
          variant="h5"
        >
          Messenger
        </Typography>
      </Box>
    </Link>
  );
};

export default Logo;
