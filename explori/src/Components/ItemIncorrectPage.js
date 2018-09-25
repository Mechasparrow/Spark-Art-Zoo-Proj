/**
ItemIncorrectPage.js

Page rendered when an item quiz submission is incorrect

**/

//reactjs
import React, {Component} from 'react';

// Material Components

//typography
import Typography from "@material-ui/core/Typography";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";


//styling
const styles = {

}

/**
Declare the ItemIncorrectPage
**/

class ItemIncorrectPage extends Component {

  constructor(props) {
    super(props);

  }

  //renders the component
  render() {

    const {classes} = this.props;

    return (
      <div className = "ItemIncorrectPage">
        item complete page
      </div>
    )
  }

}

//styling config helper
ItemIncorrectPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemIncorrectPage);
