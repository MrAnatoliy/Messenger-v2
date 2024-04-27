import { useEffect, useState } from "react";
import default_contact_round from "../static/default_contact_round.png";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUser, setUserStatus } from "../store/authSlice";
import { Circle } from "@mui/icons-material";
import { STATUS } from "../util/statuses";

const UserCard = () => {
  const dispatcher = useAppDispatch();

  const user = useAppSelector(selectUser);

  const [status, setStatus] = useState("online");

  useEffect(() => {
    let enumStatus: STATUS = STATUS.Online;
    switch (status) {
      case "online":
        enumStatus = STATUS.Online;
        break;
      case "doNotDisturb":
        enumStatus = STATUS.DoNotDisturb;
        break;
      case "away":
        enumStatus = STATUS.Away;
        break;
      case "invisible":
        enumStatus = STATUS.Offline;
        break;
      default:
        break;
    }
    dispatcher(setUserStatus(enumStatus));
  }, [status]);

  const statusColor = () => {
    return status + ".main";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
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
          marginRight: 2,
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
                  color: "primary.main",
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
