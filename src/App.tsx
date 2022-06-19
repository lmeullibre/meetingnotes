import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Meetings from "./meetings";
import { ThemeProvider, Typography } from "@mui/material";
import { theme } from "./theme/index";
import { SnackbarProvider } from "notistack";
import { Dashboard } from "@mui/icons-material";
import { DashboardNavbar } from "./navbar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <DashboardNavbar></DashboardNavbar>
        <div className="App">
          <header className="App-header">
            <Meetings></Meetings>
          </header>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
