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
import SvgIcon from "@material-ui/core/SvgIcon";

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
  qr_icon: {
    fontSize: "1.25em",
    color: "white"
  },
  back_button_icon: {
    fontSize: "1.5em",
    color: "white"
  }
};

function QRIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15M16,15V18H18V15H16M4,20V14H10V20H4M6,6V8H8V6H6M16,6V8H18V6H16M6,16V18H8V16H6M4,11H6V13H4V11M9,11H13V15H11V13H9V11M11,6H13V10H11V6M2,2V6H0V2A2,2 0 0,1 2,0H6V2H2M22,0A2,2 0 0,1 24,2V6H22V2H18V0H22M2,18V22H6V24H2A2,2 0 0,1 0,22V18H2M22,22V18H24V22A2,2 0 0,1 22,24H18V22H22Z" />
    </SvgIcon>
  );
}

//creates the header bar component
class HeaderBar extends Component {
  constructor(props) {
    super(props);

    //bind the functions
    this.goBack = this.goBack.bind(this);
    this.goToScanner = this.goToScanner.bind(this);
  }

  // navigates back a page
  goBack() {
    this.props.history.goBack();
  }

  // navigates to the scanner
  goToScanner() {
    this.props.history.push("/scanner");
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

            <IconButton onClick={this.goToScanner}>
              <QRIcon className={classes.qr_icon} />
            </IconButton>

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
