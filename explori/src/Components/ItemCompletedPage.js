/**
ItemCompletePage.js

Page rendered when an item quiz is completed

**/

//reactjs
import React, { Component } from "react";


//icons
import Check from '@material-ui/icons/Check';


// Material Components

import Button from '@material-ui/core/Button';

//typography
import Typography from "@material-ui/core/Typography";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//Routing
import { Link, Redirect } from "react-router-dom";


//styling
const styles = {  title: {
    marginTop: '16px',
    textAlign: "center"
  },
  image_container: {
    position: 'relative',
    marginLeft: "auto",
    marginRight: "auto",
    width: '200px',
  },
  icon: {
    position: 'absolute',
    top: '60px',
    left: '60px',
    fontSize: '80px',
    color: 'green'
  },
  item_img: {
    marginTop: "32px",
    border: "2px solid black",
    width: "200px",
    height: "200px",
    backgroundColor: "white",
  },
  btn_container: {
    marginTop: '32px',
    maxWidth: "300px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  button: {
    float: 'right',
    margin: '4px'
  }
};

/**
Declare the ItemCompletePage
**/

class ItemCompletePage extends Component {
  constructor(props) {
    super(props);

    this.nextItem = this.nextItem.bind(this);

    this.state = {
      next_item: false,
      valid: this.props.collection_item_selected
    }

  }

  //navigates to the next item
  nextItem() {

    this.props.clearItemSelection();

    this.setState({
      ...this.state,
      next_item: true
    })

  }

  //renders the component
  render() {
    const { classes } = this.props;

    if (this.state.valid === false) {
      return (<Redirect to = "/"></Redirect>);
    }

    if (this.state.next_item) {
      return (
        <Redirect to = "/view-item"></Redirect>
      )
    }

    return (
      <div className="ItemCompletePage">
        <div className = {classes.title}>
          <Typography variant = "display2">
            Quiz Passed
          </Typography>
        </div>

        <div className = {classes.image_container}>
          <div className = {classes.item_img}>
          </div>
          <Check className = {classes.icon}>
          </Check>
        </div>

        <div className = {classes.btn_container}>
          <Link to = "/">
            <Button
              className = {classes.button}
              component = "span"
              variant = "contained"
              color = "primary">
              Back
            </Button>
          </Link>
          <Button onClick = {this.nextItem} className = {classes.button} component = "span" variant = "contained" color = "secondary">
            Next
          </Button>

        </div>
      </div>
    );
  }
}

//styling config helper
ItemCompletePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemCompletePage);
