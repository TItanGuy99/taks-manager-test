/* Component for the form that creates a new Project */

import React, { Component } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@material-ui/core";

class newProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  render() {
    return (
      <Box m={2}>
        <Card style={{ maxWidth: "100%" }}>
          <CardContent>
            <Typography variant="h5" component="h2" align="left">
              Create a new project
            </Typography>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                this.props.callAdd(this.state.name);
                this.setState({ name: "" });
              }}
            >
              <TextField
                value={this.state.name}
                onChange={(event) => {
                  this.setState({
                    name: event.target.value,
                  });
                }}
                inputProps={{
                  maxLength: 15,
                }}
                id="project_name"
                label="Project name"
                variant="outlined"
                margin="normal"
                required
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Add
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    );
  }
}

export default newProject;
