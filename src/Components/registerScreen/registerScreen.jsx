/* Component to register a new user */

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

class registerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      psw1: "",
      psw2: "",
      warning: false,
      warningMsg: "",
    };

    this.verifyValues = this.verifyValues.bind(this);
    this.closeWarning = this.closeWarning.bind(this);
    this.generateToken = this.generateToken.bind(this);
  }

  /* Close warning message */
  closeWarning() {
    this.setState({ warningMsg: "", warning: false });
  }

  /* Generate a token for the user */
  generateToken(length) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /* Verify if a user doesn't exist in the DB before register it */
  verifyValues() {
    if (this.state.psw1 === this.state.psw2) {
      api
        .get("/users")
        .then((response) => {
          const user = response.data.find(
            (element) => element.userName === this.state.name
          );
          if (typeof user === "undefined") {
            const getToken = this.generateToken(4);
            const newUser = {
              userName: this.state.name,
              password: this.state.psw1,
              token: getToken,
            };

            api
              .post("/users", newUser)
              .then((response) => {
                sessionStorage.setItem("user", newUser.userName);
                sessionStorage.setItem(
                  "userToken",
                  newUser.userName + newUser.token
                );
                this.props.history.push("/Projects");
              })
              .catch((err) => {
                console.error("Error: " + err);
              });
          } else {
            this.setState({
              warningMsg: "User already exists.",
              warning: true,
            });
          }
        })
        .catch((err) => {
          console.error("Error ", +err);
        });
    } else {
      this.setState({
        warningMsg: "Passwords are not the same!",
        warning: true,
      });
    }
  }

  render() {
    return (
      <Container component="article" maxWidth="sm">
        <Box m={2}>
          <Typography variant="h3" component="h2" align="center">
            Register
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
            value={this.state.psw1}
            onChange={(event) => {
              this.setState({ psw1: event.target.value });
            }}
            id="password1"
            label="Passworld"
            variant="outlined"
            margin="normal"
            type="password"
            required
            fullWidth
          />
          <TextField
            value={this.state.psw2}
            onChange={(event) => {
              this.setState({ psw2: event.target.value });
            }}
            id="password2"
            label="Confirm your passworld"
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
          message={this.state.warningMsg}
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

export default registerScreen;
