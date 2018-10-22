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

//api interface
import ApiInterface from "../Lib/ApiInterface";

//Models
import Collection from "../Models/Collection";

//components
import CollectionGrid from "./CollectionGrid";

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
    console.log(props);

    this.state = {
      collections: []
    };

    //bind the functions
    this.loadInCollections = this.loadInCollections.bind(this);

    //clear the item selection
    this.props.clearItemSelection();

    //clear the collection selection
    this.props.clearCollectionSelection();

    //load in the collections from the server
    this.loadInCollections();
  }

  loadInCollections() {
    ApiInterface.getCollections()
      .then(
        function(collections) {
          this.setState({
            ...this.state,
            collections
          });
        }.bind(this)
      )
      .catch(function(err) {
        console.log(err);
        console.log("server probably not up");
      });
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

          <CollectionGrid collections={this.state.collections} rowlength={2} />
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
