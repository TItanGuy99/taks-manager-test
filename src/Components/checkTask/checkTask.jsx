/* Component for the checkbox */

import React, { Component } from "react";
import {
  Container,
  Checkbox,
  FormControlLabel,
  Tooltip,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./checkTask.css";

class checkTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };
  }

  render() {
    return (
      <Container fixed align="left">
        <Tooltip title={this.props.date}>
          <Grid container direction="row" alignItems="center" spacing={6}>
            <Grid item xs={8} md={8} sm={8}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.props.checked ? true : this.state.checked}
                    disabled={this.props.checked ? true : this.state.checked}
                    onChange={(event) => {
                      if (!this.props.checked) {
                        this.props.callDone(
                          this.props.taskId,
                          this.props.date,
                          this.props.name
                        );
                      }
                    }}
                    name="checkedA"
                    color="primary"
                  />
                }
                label={this.props.name}
              />
            </Grid>

            <Grid
              item
              xs={2}
              md={2}
              sm={2}
              className={this.props.checked ? "hide" : ""}
            >
              <DeleteIcon
                fontSize="small"
                onClick={(event) => {
                  this.props.callRemove(this.props.taskId);
                }}
                style={{ cursor: "pointer" }}
              />
            </Grid>

            <Grid
              item
              xs={2}
              md={2}
              sm={2}
              className={this.props.checked ? "hide" : ""}
            >
              <EditIcon
                fontSize="small"
                onClick={(event) => {
                  this.props.callEdit(this.props.taskId);
                }}
                style={{ cursor: "pointer" }}
              />
            </Grid>
          </Grid>
        </Tooltip>
      </Container>
    );
  }
}

export default checkTask;
