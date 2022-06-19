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

interface MeetingRowProps {
  meeting: Meeting
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
  searchCard: {
    marginBottom: "1rem",
  },
  queryField: {
    width: "100%",
  },
}));

const MeetingRow: FC<MeetingRowProps> = ({meeting}) => {
  const classes = useStyles();
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isDrawerInfoOpen, setDrawerInfoOpen] = useState<boolean>(false);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [query, setQuery] = useState<string>("");
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting>();
  
const handleCloseMenu = () => {
  setAnchorEl(null);
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

  
  const handleClick = (event: any) => {
    console.log("klkkk")
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {meeting.meetingName}
      </TableCell>
      <TableCell align="right">
        <Box>
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Show topics
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem>
              {meeting.meetingTopics.map((topic, key) => {
                return <Chip label={topic.name}></Chip>;
              })}
            </MenuItem>
          </Menu>
        </Box>
      </TableCell>
      <TableCell align="right">{msToTime(meeting.durationInMs)}</TableCell>
      <TableCell align="right">
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            setSelectedMeeting(meeting);
            handleButtonInfo();
          }}
        >
          <EyeIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete" size="small">
          <TrashIcon fontSize="small" />
        </IconButton>
      </TableCell>
      {selectedMeeting && (
          <DetailsDrawer
            handleClose={handleCloseInfo}
            isOpen={isDrawerInfoOpen}
            meeting={selectedMeeting}
          ></DetailsDrawer>
        )}
    </TableRow>
  );
};

export default MeetingRow;
