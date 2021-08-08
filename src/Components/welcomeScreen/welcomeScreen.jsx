/* Welcome screen, choose between login and register */

import React, { Component } from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import "@fontsource/roboto";

class welcomeScreen extends Component {
  render() {
    return (
      <Container component="article" maxWidth="sm">
        <Box m={2}>
          <Typography variant="h3" component="h2" align="center">
            Welcome to the Task Manager
          </Typography>
        </Box>
        <Box m={2}>
          <Link to="/Login" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Link>
        </Box>
        <Box m={2}>
          <Link to="/Register" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary" fullWidth>
              Register
            </Button>
          </Link>
        </Box>
      </Container>
    );
  }
}

export default welcomeScreen;
