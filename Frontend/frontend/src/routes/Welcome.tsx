import React from "react";
import Header from "../components/Header";
import { Box, Button, Typography } from "@mui/material";
import { PeopleAltRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header enableAuthButtons={true} />
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginX: '150px',
            marginBottom: 10,
          }}
        >
          <PeopleAltRounded
            sx={{
              color: "primary.main",
              width: 200,
              height: 200,
            }}
          />
          <Typography
            align="center"
            color={"secondary.contrastText"}
            variant="h3"
          >
            Communicating with people has never been easier
          </Typography>
          <Typography
            align="center"
            color={"primary.main"}
            variant="h5"
          >
            With our Messenger app, communication is effortless. Connect with
            ease and stay in touch with friends and family seamlessly. Get
            started now and simplify your messaging experience.
          </Typography>
          <Button
            onClick={() => navigate("login")}
            sx={{
              marginTop: 8,
              textTransform: "none",
              fontSize: "1.5rem",
              borderRadius: "8px",
            }}
            variant="contained"
          >
            Get started
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Welcome;
