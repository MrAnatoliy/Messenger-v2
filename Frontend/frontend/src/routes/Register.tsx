import { Box, Typography, TextField, Button } from "@mui/material";
import React from "react";
import Page from "../components/Page";

const Register = () => {
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
          Register
        </Typography>
        <TextField
          fullWidth
          sx={{
            width: "80%",
          }}
          margin="normal"
          variant="outlined"
          label="email"
        />
        <TextField
          fullWidth
          sx={{
            width: "80%",
          }}
          margin="normal"
          variant="outlined"
          label="username"
        />
        <TextField
          fullWidth
          sx={{
            width: "80%",
          }}
          margin="normal"
          variant="outlined"
          label="password"
        />
        <TextField
          fullWidth
          sx={{
            width: "80%",
          }}
          margin="normal"
          variant="outlined"
          label="repeat password"
        />
        <Button
          variant="contained"
          sx={{
            marginTop: 1,
            marginBottom: 5,
            width: "150px",
            textTransform: "none",
          }}
        >
          Get in
        </Button>
      </Box>
    </Page>
  );
};

export default Register;
