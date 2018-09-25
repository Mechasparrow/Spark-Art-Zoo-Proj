/**
HeaderBar.js

Main Header for the application

**/

//reactjs
import React, { Component } from "react";

//material components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

//prop types + styling
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//styling for component
const styles = {
  root: {
    flexGrow: 1,
    background: "#3F51B5"
  }
};

class HeaderBar extends Component {
  constructor(props) {
    super(props);
  }

  //render the component
  render() {
    const { classes } = this.props;

    return (
      <div className="HeaderBar">
        <AppBar className={classes.root} position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Explori
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

//styling helper
HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HeaderBar);
