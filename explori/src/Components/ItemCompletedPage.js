/**
ItemCompletePage.js

Page rendered when an item quiz is completed

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
Declare the ItemCompletePage
**/

class ItemCompletePage extends Component {

  constructor(props) {
    super(props);

  }

  //renders the component
  render() {

    const {classes} = this.props;

    return (
      <div className = "ItemCompletePage">
        item complete page
      </div>
    )
  }

}

//styling config helper
ItemCompletePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemCompletePage);
