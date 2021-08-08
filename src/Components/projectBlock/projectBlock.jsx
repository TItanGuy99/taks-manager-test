/* Component for each project block */

import React, { Component } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CheckTask from "../checkTask/checkTask";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import api from "../../Services/Api";

class projectBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      name: "",
      newName: "",
      startDate: "",
      edit: false,
      taskId: 0,
    };

    this.checkDone = this.checkDone.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.getElements = this.getElements.bind(this);
  }

  /* When component is mounted, get all elements */
  componentDidMount() {
    this.getElements();
  }

  /* Method to get all the registers for the projects */
  getElements() {
    api
      .get(
        "/projects/" +
          this.props.projectId +
          "/tasks?ProjectId=" +
          this.props.projectId
      )
      .then((response) => {
        let aux = [];
        response.data.forEach((element) => {
          aux.push(element);
        });
        this.setState({ tasks: aux });
      });
  }

  /* Check that a task is done */
  checkDone(taskId, startDate, name) {
    const today = new Date();
    const endDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

    const newTask = {
      name: name,
      checked: true,
      startDate: startDate,
      endDate: endDate,
      projectId: this.props.projectId,
    };

    api
      .put("/tasks/" + taskId, newTask)
      .then((response) => {
        this.getElements();
      })
      .catch((err) => {
        console.error("Error: " + err);
      });
  }

  /* Add a new task in the DB */
  addTask() {
    const newTask = {
      name: this.state.name,
      projectId: this.props.projectId,
      startDate: this.state.startDate,
      endDate: "",
    };

    api
      .post("/tasks/", newTask)
      .then((response) => {
        this.getElements();
        this.setState({ name: "" });
      })
      .catch((err) => {
        console.error("Error: " + err);
      });
  }

  /* remove task from the DB */
  removeTask(taskId) {
    api
      .delete("/tasks/" + taskId)
      .then((response) => {
        this.getElements();
      })
      .catch((err) => {
        console.error("Error: " + err);
      });
  }

  /* Open modal to edit the task description */
  openModal(taskId) {
    this.setState({ edit: true, taskId });
  }

  /* Close modal */
  closeEdit() {
    this.setState({ edit: false });
  }

  /* Save edition in a specific task */
  saveEdit() {
    const today = new Date();
    const startDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

    const newTask = {
      name: this.state.newName,
      checked: false,
      startDate: startDate,
      endDate: "",
      projectId: this.props.projectId,
    };

    api
      .put("/tasks/" + this.state.taskId, newTask)
      .then((response) => {
        this.getElements();
        this.setState({ newName: "", taskId: "", edit: false });
      })
      .catch((err) => {
        console.error("Error: " + err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Box m={2}>
          <Card style={{ maxWidth: "100%" }}>
            <CardContent>
              <Grid
                container
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                <Grid item xs={8} md={8} sm={8}>
                  <Typography variant="h5" component="h2" align="left">
                    {this.props.name}
                  </Typography>
                </Grid>

                <Grid item xs={2} md={2} sm={2}>
                  <DeleteIcon
                    fontSize="small"
                    onClick={(event) => {
                      this.props.callRemove(this.props.projectId);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </Grid>

                <Grid item xs={2} md={2} sm={2}>
                  <EditIcon
                    fontSize="small"
                    onClick={(event) => {
                      this.props.callEdit(this.props.projectId);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </Grid>
              </Grid>

              <hr />

              <Typography align="left">To do</Typography>

              {this.state.tasks.map((value, index) => {
                if (!value.checked) {
                  return (
                    <CheckTask
                      key={index}
                      taskId={value.id}
                      name={value.name}
                      date={value.startDate}
                      checked={false}
                      callDone={this.checkDone}
                      callRemove={this.removeTask}
                      callEdit={this.openModal}
                    />
                  );
                } else {
                  return <React.Fragment key={index} />;
                }
              })}

              <hr />

              <Typography align="left">Done</Typography>

              {this.state.tasks.map((value, index) => {
                if (value.checked) {
                  return (
                    <CheckTask
                      key={index}
                      position={index}
                      name={value.name}
                      date={value.endDate}
                      checked={true}
                      callDone={this.checkDone}
                      callRemove={this.removeTask}
                      callEdit={this.openModal}
                    />
                  );
                } else {
                  return <React.Fragment key={index} />;
                }
              })}

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  this.addTask();
                }}
              >
                <TextField
                  value={this.state.name}
                  onChange={(event) => {
                    const today = new Date();
                    this.setState({
                      name: event.target.value,
                      startDate:
                        today.getFullYear() +
                        "-" +
                        (today.getMonth() + 1) +
                        "-" +
                        today.getDate() +
                        " " +
                        today.getHours() +
                        ":" +
                        today.getMinutes() +
                        ":" +
                        today.getSeconds(),
                    });
                  }}
                  inputProps={{
                    maxLength: 15,
                  }}
                  id="task_name"
                  label="Task name"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>

        <Dialog
          open={this.state.edit}
          onClose={this.closeEdit}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the new description for the task.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Task Description"
              fullWidth
              inputProps={{
                maxLength: 15,
              }}
              onChange={(event) => {
                const today = new Date();
                this.setState({
                  newName: event.target.value,
                  startDate:
                    today.getFullYear() +
                    "-" +
                    (today.getMonth() + 1) +
                    "-" +
                    today.getDate() +
                    " " +
                    today.getHours() +
                    ":" +
                    today.getMinutes() +
                    ":" +
                    today.getSeconds(),
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
      </React.Fragment>
    );
  }
}

export default projectBlock;
