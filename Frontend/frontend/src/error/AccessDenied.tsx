import { Container, Typography } from '@mui/material';
import React from 'react';
import { IAccessDenied } from '../interface/IAccessDenied';

export const AccessDenied = (props: IAccessDenied) => {
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
                    fontWeight: 700,
                }}
                variant="h1"
            >
                Access Denied
            </Typography>
            <Typography
                sx={{
                    color: "primary.contrastText",
                    fontWeight: 300,
                }}
                variant="h3"
            >
                Required role : {props.requiredRole}
            </Typography>
        </Container>
    );
};
