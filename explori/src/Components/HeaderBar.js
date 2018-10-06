/**
HeaderBar.js

Main Header for the application

**/

//reactjs
import React, { Component } from "react";

// Grid system
import Grid from "@material-ui/core/Grid";

//material components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
//icons
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

//prop types + styling
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//styling for component
const styles = {
  root: {
    flexGrow: 1,
    background: "#3F51B5"
  },
  title: {
    marginLeft: "16px",
    flexGrow: 1
  },
  score: {
    float: "right"
  },
  back_button_icon: {
    fontSize: "1.5em",
    color: "white"
  }
};

//creates the header bar component
class HeaderBar extends Component {
  constructor(props) {
    super(props);

    //bind the functions
    this.goBack = this.goBack.bind(this);
  }

  // navigates back a page
  goBack() {
    this.props.history.goBack();
  }

  //render the component
  render() {
    const { classes } = this.props;

    return (
      <div className="HeaderBar">
        <AppBar className={classes.root} position="static">
          <Toolbar>
            {this.props.location.pathname !== "/" && (
              <IconButton onClick={this.goBack} className={classes.back_button}>
                <NavigateBeforeIcon className={classes.back_button_icon} />
              </IconButton>
            )}

            <Typography
              className={classes.title}
              variant="title"
              color="inherit"
            >
              Explori
            </Typography>
            <Typography
              className={classes.score}
              variant="title"
              color="inherit"
            >
              {this.props.score}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

//styling helper
HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(HeaderBar);
