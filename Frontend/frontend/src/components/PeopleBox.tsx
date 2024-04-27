import { PersonSearchRounded } from "@mui/icons-material";
import { Box, IconButton, List, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { IResponseUser, addChat, getAllContacts, getAllPeople, selectChats, selectMyself } from "../store/chatSlice";
import PeopleCard from "./PeopleCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUser } from "../store/authSlice";

const PeopleBox = () => {
  const dispatch = useAppDispatch()
  const peopleState: IResponseUser[] = Array<IResponseUser>();
  const myself = useAppSelector(selectMyself)
  const token = useAppSelector(selectUser)?.token;
  const contacts = useAppSelector(selectChats)
  const [people, setPeople] = useState(peopleState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPeople = await getAllPeople(token || "");
        if (fetchedPeople) {
          const filteredPeople = fetchedPeople.filter(person => {
            //check if is it contact
            const isCurrentUser = person.id === myself?.contact_id
            const isContactUser = contacts?.some(contact => contact.sender.contact_id === person.id)

            return !isCurrentUser && !isContactUser
          })
          setPeople(filteredPeople);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [contacts, myself?.contact_id, token]);

  useEffect(() => {
    dispatch(getAllContacts({userId: myself?.contact_id || 0, token: token || ""}))
  }, [dispatch, myself?.contact_id, token])

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <TextField
          autoComplete="off"
          placeholder="Type username to find someone"
          sx={{
            width: "80%",
            "& .MuiInputBase-root": {
              borderRadius: "15px",
              "& input": {
                paddingY: 1.5,
              },
            },
          }}
        />
        <IconButton
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#F2F7F9",
              "& .MuiSvgIcon-root": {
                color: "secondary.contrastText",
              },
            },
          }}
        >
          <PersonSearchRounded
            sx={{
              color: "primary.main",
              fontSize: 32,
            }}
          />
        </IconButton>
      </Box>
      <List sx={{
        width: "100%",
      }}>
        {people.map((person, index) => (
          <PeopleCard key={index} contact={person} />
        ))}
      </List>
    </Box>
  );
};

export default PeopleBox;
