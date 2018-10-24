/**

./Components/BadgePage.js

Page that displays the Badges that have been completed and uncompleted

**/

//react
import React, { Component } from "react";

//lib
import _ from "lodash";

//material ui
import Typography from "@material-ui/core/Typography";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//api interface
import ApiInterface from "../Lib/ApiInterface";

//Models
import Badge from "../Models/Collection";

//Routing
import { Redirect } from "react-router-dom";

//styling
const styles = {
  title: {
    marginTop: "16px",
    textAlign: "center"
  }
};

//define the BadgePage class

class BadgePage extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    //set default state

    if (this.props.valid === true) {
      this.state = {};
    } else {
      this.state = {
        valid: false
      };
    }
    //bind the functions
    this.loadInData = this.loadInData.bind(this);
  }

  //loads in the data from the server
  loadInData() {
    //TODO
  }

  //Render the HomePage w/ a grid of collections
  render() {
    const { classes } = this.props;

    if (this.state.valid === false) {
      return <Redirect to="/" />;
    }

    return (
      <div className="BadgePage">
        <Typography variant="display2" className={classes.title}>
          Badges
        </Typography>
      </div>
    );
  }
}

//styling helper config
BadgePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BadgePage);
