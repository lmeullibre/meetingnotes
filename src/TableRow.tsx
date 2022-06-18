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
import {
  Eye as EyeIcon,
  Trash as TrashIcon,
  Plus as PlusIcon,
} from "react-feather";

interface TableRowProps {
  name: string;
  email: string;
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

const TableRowGang: FC<TableRowProps> = ({ name, email }) => {
  const classes = useStyles();
  const [nameEdit, setNameEdit] = useState<boolean>(false);
  const [emailEdit, setEmailEdit] = useState<boolean>(false);
  const [nameTemp, setNameTemp] = useState<string>(name);
  const [emailTemp, setEmailTemp] = useState<string>(email);

  const handleOnBlurName = (): void => {
    setNameEdit(false);
  };

  const handleOnBlurEmail = (): void => {
    setEmailEdit(false);
  };

  useEffect(() => {
    // getText();
  }, []);

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {!nameEdit ? (
          <Typography
            variant="body2"
            onClick={() => {
              setNameEdit(true);
            }}
          >
            {name}
          </Typography>
        ) : (
          <TextField
            variant="standard"
            onFocus={(event) => {
              event.target.select();
            }}
            autoFocus
            value={name}
            onChange={(event) => setNameTemp(event.target.value)}
            onBlur={(event) => handleOnBlurName()}
          />
        )}
      </TableCell>
      <TableCell align="right">
        {!emailEdit ? (
          <Typography
            variant="body2"
            onClick={() => {
              setEmailEdit(true);
            }}
          >
            {email}
          </Typography>
        ) : (
          <TextField
            variant="standard"
            onFocus={(event) => {
              event.target.select();
            }}
            autoFocus
            value={email}
            onChange={(event) => setEmailTemp(event.target.value)}
            onBlur={(event) => handleOnBlurEmail()}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default TableRowGang;
