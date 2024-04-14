import React, { useState } from "react";
import default_contact_round from "../static/default_contact_round.png";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/authSlice";
import { Circle } from "@mui/icons-material";

const UserCard = () => {
  const user = useAppSelector(selectUser);

  const [status, setStatus] = useState("online");

  const statusColor = () => {
    return status + ".main";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        m: 1,
        p: 1,
      }}
    >
      <Box
        component="img"
        width={70}
        sx={{
          content: `url(${default_contact_round})`,
        }}
        alt="UserPic"
      />
      <Box>
        <Typography variant="h5" color="secondary.main" fontWeight={700}>
          {user?.username}
        </Typography>
        <Box display="flex" alignItems="center">
          <Circle
            sx={{
              color: statusColor(),
            }}
          />
          <FormControl
            size="small"
            sx={{
              minWidth: 110,
            }}
          >
            <Select
              variant="outlined"
              id="status-select"
              value={status}
              label=""
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              sx={{
                "& .MuiSelect-outlined": {
                  paddingLeft: "7px",
                  color: "primary.main",
                },
                "& .MuiSelect-icon": {
                  color: "primary.main"
                },
                "& fieldset": {
                  border: "none",
                },
              }}
            >
              <MenuItem value="online">online</MenuItem>
              <MenuItem value="doNotDisturb">busy</MenuItem>
              <MenuItem value="away">away</MenuItem>
              <MenuItem value="invisible">invisible</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default UserCard;
