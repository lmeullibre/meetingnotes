import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  IconButton,
  Paper,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FC, ChangeEvent } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { unmountComponentAtNode, render } from "react-dom";

import {
  Eye as EyeIcon,
  Trash as TrashIcon,
  Plus as PlusIcon,
  Smile as HappyIcon,
  Frown as SadIcon,
} from "react-feather";
import TableRowGang from "./TableRow";
import ParticipantPie from "./Pie";
import { Meeting, ParticipantStats, Topic } from "./types/meeting";
import axios from "axios";

interface DetailsDrawerProps {
  isOpen: boolean;
  handleClose: any;
  meeting: Meeting;
}

const rows = [
  createData("Erald", "erald@gmail.com"),
  createData("Stefano", "stefano@gmail.com"),
  createData("Sergi", "sergi@gmail.com"),
];

function createData(name: string, email: string) {
  return { name, email };
}

const useStyles = makeStyles((theme) => ({
  root: {},
  drawer: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#282c34",
  },
  arrowLeft: {
    paddingLeft: 0,
  },

  icon: {
    color: "#5048E5",
  },
}));

const DetailsDrawer: FC<DetailsDrawerProps> = ({
  isOpen,
  handleClose,
  meeting,
}) => {
  const classes = useStyles();
  const [participants, setParticipants] = useState<ParticipantStats[]>();
  const [topics, setTopics] = useState<Topic[]>();

  const icons = (up: number, down: number) => {
    return (
      <div>
        <Box display="flex" gap="6px" mr={2}>
          <Box display="flex" color="#4ceb34" gap={"1px"}>
            <HappyIcon />
            <Typography>{up}</Typography>
          </Box>
          <Box display="flex" color="#e63051">
            <SadIcon />
            <Typography>{down}</Typography>
          </Box>
        </Box>
      </div>
    );
  };

  const handlePlus = () => {};

  function msToTime(s: number) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ":" + mins + ":" + secs + "." + ms;
  }

  const getParticipantStats = (): void => {
    axios
      .get(
        `https://meeting-notes.azurewebsites.net/meetings/${meeting.id}/participantStats`
      )
      .then(function (response) {
        if (response && response.data) {
          console.log("success", response.data);
          setParticipants(response.data);
        }
      })
      .catch(function (error: { response: { data: any } }) {
        console.log("error bro");
        if (error && error.response && error.response.data) {
          console.log(error.response.data);
        }
      });
  };

  const getTopics = (): void => {
    axios
      .get(
        `https://meeting-notes.azurewebsites.net/meetings/${meeting.id}/topics`
      )
      .then(function (response) {
        if (response && response.data) {
          console.log("success", response.data);
          setTopics(response.data);
        }
      })
      .catch(function (error: { response: { data: any } }) {
        console.log("error bro");
        if (error && error.response && error.response.data) {
          console.log(error.response.data);
        }
      });
  };

  useEffect(() => {
    getParticipantStats();
    getTopics();
  }, []);

  if (participants && topics) {
    return (
      <Drawer
        anchor={"right"}
        open={isOpen}
        onClose={() => {
          handleClose();
          getTopics();
        }}
      >
        <Box mt={2} sx={{ width: "400px" }}>
          <Container
            sx={{ width: "380px", display: "flex", flexDirection: "column" }}
          >
            <Box textAlign={"center"}>
              <Typography color="secondary" variant="h3">
                {meeting.meetingName}
              </Typography>
              <Box mt={2}>
                <Box display="flex" gap={1}>
                  <Typography variant="h5">Project:</Typography>
                  <Typography>{meeting.meetingName}</Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Typography variant="h5">Duration:</Typography>
                  <Typography>{msToTime(meeting.durationInMs)}</Typography>
                </Box>
              </Box>
            </Box>
            <Box mt={2}>
              <Typography color="secondary" variant="h4">
                Summary:
              </Typography>
              <Typography variant="subtitle1">
                Es un árbol monoico, caducifolio de ramas abiertas y amplia
                copa. Su corteza, de color ceniciento o verdoso, castaño en los
                troncos viejos, se desprende en placas escamosas que dejan al
                descubierto manchas irregulares amarillentas o blanquecinas de
                la corteza interna.
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              gap={1}
              flexWrap={"wrap"}
              textAlign="center"
            >
              {topics.map((topic, index) => {
                return (
                  <Chip
                    onDelete={() => console.log()}
                    label={topic.name}
                    deleteIcon={icons(
                      topic.relevantCount,
                      topic.notRelevantCount
                    )}
                  ></Chip>
                );
              })}
            </Box>

            <Box mt={2} display="flex" alignItems={"center"}>
              <Typography color="secondary" variant="h4">
                Participants:
              </Typography>
              <Box marginLeft="auto">
                <IconButton
                  color="secondary"
                  aria-label="upload picture"
                  component="span"
                  onClick={handlePlus}
                >
                  <PlusIcon />
                </IconButton>
              </Box>
            </Box>
            <Box textAlign={"center"}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 250 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {participants.map((participant, index) => (
                      <TableRowGang
                        key={index}
                        name={participant.participantName.toLocaleLowerCase()}
                        email={
                          participant.participantName.toLocaleLowerCase() +
                          "@gmail.com"
                        }
                      ></TableRowGang>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button>Send email</Button>
            </Box>
            <Box>
              <Typography color="secondary" variant="h4">
                Stats:
              </Typography>
              <ParticipantPie participants={participants}></ParticipantPie>
            </Box>
          </Container>
        </Box>
      </Drawer>
    );
  } else return null;
};

export default DetailsDrawer;
