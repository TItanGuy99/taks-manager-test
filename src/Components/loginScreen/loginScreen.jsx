/* Component for the login */

import React, { Component } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import "@fontsource/roboto";
import api from "../../Services/Api";

class loginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      psw: "",
      warning: false,
    };

    this.verifyValues = this.verifyValues.bind(this);
    this.closeWarning = this.closeWarning.bind(this);
  }

  /* Show warning in case of error while trying to login */
  closeWarning() {
    this.setState({ warning: false });
  }

  /* Verify if the we have a valid login or not */
  verifyValues() {
    api
      .get("/users")
      .then((response) => {
        const user = response.data.find(
          (element) => element.userName === this.state.name
        );
        if (user.password === this.state.psw) {
          sessionStorage.setItem("user", user.userName);
          sessionStorage.setItem("userToken", user.userName + user.token);
          this.props.history.push("/Projects");
        } else {
          this.setState({ warning: true });
        }
      })
      .catch((err) => {
        this.setState({ warning: true });
      });
  }

  render() {
    return (
      <Container component="article" maxWidth="sm">
        <Box m={2}>
          <Typography variant="h3" component="h2" align="center">
            Login
          </Typography>
        </Box>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.verifyValues();
          }}
        >
          <TextField
            value={this.state.name}
            onChange={(event) => {
              this.setState({ name: event.target.value });
            }}
            id="name"
            label="User name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            value={this.state.psw}
            onChange={(event) => {
              this.setState({ psw: event.target.value });
            }}
            id="password"
            label="Passworld"
            variant="outlined"
            margin="normal"
            type="password"
            required
            fullWidth
          />
          <Box m={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        </form>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.warning}
          autoHideDuration={6000}
          onClose={this.closeWarning}
          message="User or password are invalid."
          action={
            <React.Fragment>
              <Button
                color="secondary"
                size="small"
                onClick={this.closeWarning}
              >
                Warning
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.closeWarning}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Container>
    );
  }
}

export default loginScreen;
