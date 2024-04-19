import { PersonSearchRounded } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import React from 'react';

const PeopleBox = () => {
    return (
        <Box 
        sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <Box sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
            }}>
            <TextField 
            autoComplete='off'
            placeholder='Type username to find someone'
            sx={{
                width: "80%",
                "& .MuiInputBase-root": {
                    borderRadius: "15px",
                    "& input": {
                        paddingY: 1.5,
                    }
                }
            }}/>
            <IconButton sx={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                "&:hover": {
                    backgroundColor: "#F2F7F9",
                    "& .MuiSvgIcon-root": {
                      color: "secondary.contrastText",
                    },
                  },
            }}>
                <PersonSearchRounded sx={{
                    color: "primary.main",
                    fontSize: 32,
                }} />
            </IconButton>
            </Box>
        </Box>
    );
};

export default PeopleBox;