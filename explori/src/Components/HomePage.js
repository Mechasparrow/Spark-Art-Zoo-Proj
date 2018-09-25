/**
HomePage.js

The First Page the User sees when they enter the application

**/

//react
import React, { Component } from "react";

//material ui
import Typography from "@material-ui/core/Typography";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//Models
import Collection from "../Models/Collection";

//components
import ExhibitGrid from "./ExhibitGrid";

//styling
const styles = {
  title: {
    marginTop: "16px",
    textAlign: "center"
  }
};

//define the HomePage class
class HomePage extends Component {
  constructor(props) {
    super(props);

    //fulfill some dummy data
    this.state = {
      collections: [
        new Collection("African Art", []),
        new Collection("European Art", []),
        new Collection("Modern Art", []),
        new Collection("Modern Art", [])
      ]
    };
  }

  //Render the HomePage w/ a grid of collections
  render() {
    const { classes } = this.props;

    return (
      <div className="HomePage">
        <div className="Items">
          <Typography variant="display2" className={classes.title}>
            Exhibits
          </Typography>

          <ExhibitGrid collections={this.state.collections} rowlength={2} />
        </div>
      </div>
    );
  }
}

//styling helper config
HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
