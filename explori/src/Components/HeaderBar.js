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
import MenuIcon from "@material-ui/icons/Menu";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import StarIcon from "@material-ui/icons/Star";

//Sidebar
import SideMenu from "./SideMenu";

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
    flexGrow: 1
  },
  score: {
    float: "right"
  },
  qr_icon: {
    fontSize: "1.25em",
    color: "white"
  },
  menu_button_icon: {
    fontSize: "1.5em",
    color: "white"
  }
};

//Home Icon
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

//QR icon
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

    this.state = {
      sidemenu: false
    };

    //bind the functions
    this.goBack = this.goBack.bind(this);
    this.goHome = this.goHome.bind(this);
    this.goToBadges = this.goToBadges.bind(this);
    this.goToScanner = this.goToScanner.bind(this);

    this.openSideMenu = this.openSideMenu.bind(this);
    this.closeSideMenu = this.closeSideMenu.bind(this);

    this.getMenuOptions = this.getMenuOptions.bind(this);
  }

  //opens the side menu
  openSideMenu() {
    this.setState({
      ...this.state,
      sidemenu: true
    });
  }

  //closes the side menu
  closeSideMenu() {
    this.setState({
      ...this.state,
      sidemenu: false
    });
  }

  // navigates back a page
  goBack() {
    this.props.history.goBack();
  }

  // navigates to the scanner
  goToScanner() {
    this.props.history.push("/scanner");
  }

  goToBadges() {
    this.props.history.push("/badges");
  }

  goHome() {
    this.props.history.push("/");
  }

  //returns the options to pass to the menu
  getMenuOptions() {
    let menu_options = [];

    //push the home option
    menu_options.push({
      text: "Home",
      icon: <HomeIcon />,
      action: this.goHome
    });

    //push the qr option
    menu_options.push({
      text: "Scan Code",
      icon: <QRIcon />,
      action: this.goToScanner
    });

    //push the badges option
    menu_options.push({
      text: "View Badges",
      icon: <StarIcon />,
      action: this.goToBadges
    });

    /**
    TODO
    //random item
    menu_options.push({
      text: "Random item",
      icon: <ShuffleIcon />,
      action: () => {}
    });
    **/

    return menu_options;
  }

  //render the component
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <SideMenu
          open={this.state.sidemenu}
          openSideMenu={this.openSideMenu}
          closeSideMenu={this.closeSideMenu}
          options={this.getMenuOptions()}
        />
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              onClick={this.openSideMenu}
              className={classes.menu_button}
            >
              <MenuIcon className={classes.menu_button_icon} />
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
