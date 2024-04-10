import { Container, Typography } from "@mui/material";
import React from "react";
import { useRouteError } from "react-router-dom";
import ErrorInterface from "../interface/IErrorInterface";

const Error = () => {
  const data: any = useRouteError();
  const error: ErrorInterface = data;
  console.error(error);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100vh",
        width: "100vw",
        bgcolor: "primary.main",
      }}
    >
      <Typography
        sx={{
          color: "primary.contrastText",
        }}
        variant="h1"
      >
        Error : {error.status}
      </Typography>
      <Typography
        sx={{
          color: "primary.contrastText",
        }}
        variant="h3"
      >
        {error.statusText}
      </Typography>
      {error.message ? (
        <>
          <br />
          <Typography>Message : {error.message}</Typography>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Error;
