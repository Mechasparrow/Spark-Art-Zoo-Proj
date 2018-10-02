/**
EmptyCard.js

Defines a component that renders an empty card
**/

//import reactjs
import React, { Component } from "react";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//declare styles
const styles = {
  root: {
  }
};

//Create the EmptyCard Class
class EmptyCard extends Component {
  constructor(props) {
    super(props);
  }

  //Renders an empty div styled to have a width > 0px
  render() {
    const { classes } = this.props;

    return <div className={classes.root} />;
  }
}

//helper for styling
EmptyCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmptyCard);
