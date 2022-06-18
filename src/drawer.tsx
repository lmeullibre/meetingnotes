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
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";

import {
  Eye as EyeIcon,
  Trash as TrashIcon,
  Plus as PlusIcon,
} from "react-feather";
import axios from "axios";

interface NewMeetingDrawerProps {
  isOpen: boolean;
  onClose: any;
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

const NewMeetingDrawer: FC<NewMeetingDrawerProps> = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const [meetingName, setMeetingName] = useState<string>();
  const [projectName, setProjectName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [rawText, setRawText] = useState<string>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // getText();
  }, []);

  const createMeeting = (): void => {
    setLoading(true);
    let params: any = {};
    params["projectName"] = projectName;
    params["meetingName"] = meetingName;
    params["rawText"] = rawText;
    console.log("klkkk", params);
    axios
      .post("https://meeting-notes.azurewebsites.net/meetings", params)
      .then(function (response) {
        if (response && response.data) {
          console.log("success", response.data);
          enqueueSnackbar("All good 😄", { variant: "success" });
          setLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch(function (error) {
        console.log("error bro");
        if (error && error.response && error.response.data) {
          console.log(error.response.data);
          enqueueSnackbar("An error 😰", { variant: "error" });
          setLoading(false);
        }
      });
  };

  const allCorrect = (): boolean => {
    if (meetingName === "" || projectName === "" || rawText === "") {
      return false;
    }
    return true;
  };

  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Adding a new meeting"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please, enter the following information in order to add a new meeting
        </DialogContentText>
        <Box mt="2rem">
          <Box display="flex" flexDirection="row">
            <TextField
              required
              id="outlined-required"
              label="Meeting name"
              onChange={(event) => setMeetingName(event.target.value)}
            />
            <Box marginLeft="auto">
              <TextField
                required
                onChange={(event) => setProjectName(event.target.value)}
                id="outlined-required"
                label="Project name"
              />
            </Box>
          </Box>
          <Box mt={2}>
            <TextField
              onChange={(event) => setRawText(event.target.value)}
              sx={{ width: "100%" }}
              id="outlined-textarea"
              label="Transcript"
              placeholder="Placeholder"
              multiline
            />
          </Box>
        </Box>
      </DialogContent>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      <DialogActions>
        <Button onClick={createMeeting} disabled={!allCorrect()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewMeetingDrawer;
