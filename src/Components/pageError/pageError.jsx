/* 404 Error */

import React, { Component } from "react";
import { Container, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import "@fontsource/roboto";

class pageError extends Component {
  render() {
    return (
      <Container component="article" maxWidth="sm">
        <Box m={2}>
          <Typography variant="h3" component="h2" align="center">
            Sorry =/ This page doesn not exist - 404.
          </Typography>
        </Box>
      </Container>
    );
  }
}

export default pageError;
