/* Component where we manipulate all the projects and tasks */

import React, { Component } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
} from "@material-ui/core";
import "@fontsource/roboto";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ProjectBlock from "../projectBlock/projectBlock";
import NewProject from "../newProject/newProject";
import api from "../../Services/Api";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

class projectsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      newName: "",
      edit: false,
      currentUser: 0,
      projectId: 0,
    };

    this.addProject = this.addProject.bind(this);
    this.removeProject = this.removeProject.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.getElements = this.getElements.bind(this);
  }

  /* Get all the projects from a specific user */
  getElements() {
    if (sessionStorage.getItem("user") !== null) {
      api
        .get("/users")
        .then((userResponse) => {
          const user = userResponse.data.find(
            (element) => element.userName === sessionStorage.getItem("user")
          );
          if (
            sessionStorage.getItem("userToken") ===
            user.userName + user.token
          ) {
            api
              .get("/users/" + user.id + "/projects?userId=" + user.id)
              .then((projectsResponse) => {
                let aux = [];
                projectsResponse.data.forEach((element) => {
                  aux.push(element);
                });

                this.setState({ projects: aux, currentUser: user.id });
              });
          } else {
            this.props.history.push("/");
          }
        })
        .catch((err) => {
          console.error("User not found: ", +err);
        });
    } else {
      this.props.history.push("/");
    }
  }

  /* When component is mounted, get all elements */
  componentDidMount() {
    this.getElements();
  }

  /* Method to add a new project */
  addProject(name) {
    const newProject = { name: name, userId: this.state.currentUser };

    api
      .post(
        "/users/" +
          this.state.currentUser +
          "/projects?userId=" +
          this.state.currentUser,
        newProject
      )
      .then((response) => {
        this.getElements();
      })
      .catch((err) => {
        console.error("Error: " + err);
      });
  }

  /* Method to remove a specific project */
  removeProject(projectId) {
    api
      .delete("/projects/" + projectId)
      .then((response) => {
        this.getElements();
      })
      .catch((err) => {
        console.error("Error: " + err);
      });
  }

  /* Close modal */
  closeEdit() {
    this.setState({ edit: false });
  }

  /* Open modal that edits the project description */
  openModal(projectId) {
    this.setState({ edit: true, projectId: projectId });
  }

  /* Save edition for a specific project */
  saveEdit() {
    const newProject = {
      name: this.state.newName,
      userId: this.state.currentUser,
    };
    api
      .put("/projects/" + this.state.projectId, newProject)
      .then((response) => {
        this.setState({ newName: "", projectId: 0, edit: false });
        this.getElements();
      })
      .catch((err) => {
        console.error("Error: " + err);
      });
  }

  render() {
    return (
      <Container fixed>
        <React.Fragment>
          <AppBar position="fixed">
            <Toolbar>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item xs={10} md={10} sm={10}>
                  <Box m={2}>
                    <Typography variant="h6" component="h2" align="left">
                      Task Manager
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={2} md={2} sm={2} align="right">
                  <Box m={2}>
                    <ExitToAppIcon
                      style={{ cursor: "pointer" }}
                      onClick={(event) => {
                        sessionStorage.removeItem("user");
                        sessionStorage.removeItem("userToken");
                        this.props.history.push("/");
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Toolbar />
        </React.Fragment>

        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item xs={8} md={8} sm={12}>
            <Grid container direction="row">
              {this.state.projects.map((value, index) => {
                return (
                  <Grid item xs={6} md={6} sm={12} key={index}>
                    <ProjectBlock
                      name={value.name}
                      projectId={value.id}
                      callRemove={this.removeProject}
                      callEdit={this.openModal}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={4} md={4} sm={12}>
            <NewProject callAdd={this.addProject} />
          </Grid>
        </Grid>

        <Dialog
          open={this.state.edit}
          onClose={this.closeEdit}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the new name for the Project.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Project name"
              fullWidth
              inputProps={{
                maxLength: 15,
              }}
              onChange={(event) => {
                this.setState({
                  newName: event.target.value,
                });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeEdit} color="primary">
              Cancel
            </Button>
            <Button onClick={this.saveEdit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}

export default projectsScreen;
