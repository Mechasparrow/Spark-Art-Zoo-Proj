/**
./Components/Sidemenu.js

Sidemenu for the application

**/

//react + material-ui
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

//util lib
import _ from "lodash";

//extra icon info
import SvgIcon from "@material-ui/core/SvgIcon";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
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

class SideMenu extends Component {
  constructor(props) {
    super(props);

    //bind the functions
    this.toggleMenu = this.toggleMenu.bind(this);

    //set drawer initial state
    this.state = {
      left: this.props.open
    };
  }

  //toggles the visibility of the side menu
  toggleMenu(open) {
    if (open === true) {
      this.props.openSideMenu();
    } else if (open === false) {
      this.props.closeSideMenu();
    }
  }

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {_.map(this.props.options, function(option, idx) {
            return (
              <ListItem onClick={option.action} key={idx} button>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.text} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );

    return (
      <div>
        <SwipeableDrawer
          open={this.props.open}
          onClose={() => {
            this.toggleMenu(false);
          }}
          onOpen={() => {
            this.toggleMenu(true);
          }}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              this.toggleMenu(false);
            }}
            onKeyDown={() => {
              this.toggleMenu(false);
            }}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideMenu);
