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
      collections: [],
      source: null
    };

    //bind the functions
    this.loadInData = this.loadInData.bind(this);

    //clear the item selection
    this.props.clearItemSelection();

    //clear the collection selection
    this.props.clearCollectionSelection();

    if (this.props.selected_source_id === null) {
      this.props.grabStartingSource();
    }


    //load in the data from the server
    this.loadInData()

  }

  //loads in the data from the server
  loadInData() {

    var grab_collections;

    if (this.props.selected_source_id === null) {
      grab_collections = ApiInterface.getCollections()
    }else {
      grab_collections = ApiInterface.getSourceCollections(this.props.selected_source_id)
    }

    grab_collections
      .then(
        function(collections) {
          this.setState({
            ...this.state,
            collections
          });

          if (this.props.selected_source_id === null) {
            return new Promise ((resolve, reject) => {
              resolve(null)
            })
          }else {
            return ApiInterface.getSource(this.props.selected_source_id)
          }

        }.bind(this)
      ).then (function (source) {
        this.setState({
          ...this.state,
          source
        })
      }.bind(this))
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

            {this.state.source !== null && (<div>
              Exhibits for the {this.state.source.name} Adventure!
            </div>)}

            {this.state.source === null && (
              <div>Exhibits </div>)
            }

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
