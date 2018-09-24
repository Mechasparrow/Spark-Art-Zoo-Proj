//react
import React, { Component } from "react";

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
    textAlign: "center"
  }
};

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: [
        new Collection("African Art", 20),
        new Collection("European Art", 30),
        new Collection("Modern Art", 100),
        new Collection("Modern Art", 100)
      ]
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="HomePage">
        <div className="Items">
          <h2 className={classes.title}>Exhibits</h2>
          <ExhibitGrid collections={this.state.collections} rowlength={2} />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
