import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  Input,
  keyframes,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FC, ChangeEvent } from "react";
import makeStyles from "@mui/styles/makeStyles";
import {
  Eye as EyeIcon,
  Trash as TrashIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
} from "react-feather";
import NewMeetingDrawer from "./drawer";
import DetailsDrawer from "./DetailsDrawer";
import { Meeting } from "./types/meeting";
import axios from "axios";
import MeetingRow from "./meetingRow";
import CustomSeparator from "./bread";

interface MeetingsProps {}

function createData(name: string, duration: string, project: string) {
  return { name, duration, project };
}

function msToTime(s: number) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;
  return hrs + ":" + mins + ":" + secs + "." + ms;
}

const rows = [
  createData("Meeting 1", msToTime(999020), "Framework migration"),
  createData("Meeting 2", msToTime(999191), "Framework migration"),
  createData("Meeting 3", msToTime(999020), "Framework migration"),
  createData("Meeting 4", msToTime(200), "Framework migration"),
  createData("Meeting 5", msToTime(200), "Framework migration"),
];

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
  searchCard: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  queryField: {
    width: "100%",
  },
}));

const Meetings: FC<MeetingsProps> = ({}) => {
  const classes = useStyles();
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isDrawerInfoOpen, setDrawerInfoOpen] = useState<boolean>(false);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [query, setQuery] = useState<string>("");
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting>();

  const getMeetings = (): void => {
    axios
      .get("https://meeting-notes.azurewebsites.net/meetings")
      .then(function (response) {
        if (response && response.data) {
          console.log("success", response.data);
          setMeetings(response.data);
        }
      })
      .catch(function (error: { response: { data: any } }) {
        console.log("error bro");
        if (error && error.response && error.response.data) {
          console.log(error.response.data);
        }
      });
  };

  const handleButton = () => {
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  const handleButtonInfo = () => {
    setDrawerInfoOpen(true);
  };

  function msToTime(s: number) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ":" + mins + ":" + secs + "." + ms;
  }

  const handleCloseInfo = () => {
    setDrawerInfoOpen(false);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const open = Boolean(anchorEl);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: any) => {
    console.log("klkkk");
    setAnchorEl(event.currentTarget);
  };

  const applyFilters = (meetings: Meeting[], query: string): Meeting[] => {
    return meetings.filter((meeting) => {
      if (query != "") {
        let matched = false;
        console.log("estem a la meeting", meeting, query);
        let model_norm;
        for (let topic of meeting.meetingTopics) {
          model_norm = topic.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          if (query === model_norm) matched = true;
        }
        return matched;
      }
      return true;
    });
  };

  useEffect(() => {
    getMeetings();
  }, []);

  const filteredMeetings =
    meetings === null ? [] : applyFilters(meetings, query);

  if (meetings) {
    return (
      <Box mt={"5rem"}>
        <CustomSeparator></CustomSeparator>
        <Box textAlign={"center"}>
        </Box>
        <Card className={classes.searchCard}>
          <Box p={1} display="flex" alignItems="center">
            <SearchIcon />
            <Input
              disableUnderline
              fullWidth
              className={classes.queryField}
              placeholder={"Search"}
              value={query}
              onChange={handleQueryChange}
            />
          </Box>
        </Card>
        <Box>
          <Card>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Topics</TableCell>
                    <TableCell align="right">Duration</TableCell>
                    <TableCell align="right">Options</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMeetings.map((meeting, key) => (
                    <MeetingRow key={key} meeting={meeting}></MeetingRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
        <Box mt={2} mb={2}>
          <Button
            startIcon={<PlusIcon />}
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleButton}
          >
            Add meeting
          </Button>
        </Box>
        <NewMeetingDrawer
          isOpen={isDrawerOpen}
          onClose={handleClose}
        ></NewMeetingDrawer>

      </Box>
    );
  } else return <CircularProgress></CircularProgress>;
};

export default Meetings;
