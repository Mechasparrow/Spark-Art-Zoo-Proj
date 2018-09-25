/**
ItemIncorrectPage.js

Page rendered when an item quiz submission is incorrect

**/

//reactjs
import React, {Component} from 'react';

//icons
import ClearIcon from '@material-ui/icons/Clear';


// Material Components

import Button from '@material-ui/core/Button';

//typography
import Typography from "@material-ui/core/Typography";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//Routing
import { Link } from "react-router-dom";

//styling
const styles = {
  title: {
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
    color: 'red'
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
    float: 'right'
  }
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

        <div className = {classes.title}>
          <Typography variant = "display2">
            Quiz Failed
          </Typography>
        </div>

        <div className = {classes.image_container}>
          <div className = {classes.item_img}></div>
          <ClearIcon className = {classes.icon}></ClearIcon>
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
        </div>

      </div>
    )
  }

}

//styling config helper
ItemIncorrectPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ItemIncorrectPage);
