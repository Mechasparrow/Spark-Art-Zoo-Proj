/**
./Components/ViewCollectionPage.js

Pages that shows the items of a collection

**/

//react lib
import React, { Component } from "react";

//components
import ItemGrid from "./ItemGrid";

//material ui
import Typography from "@material-ui/core/Typography";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//api interface
import ApiInterface from "../Lib/ApiInterface";

//routing
import { Redirect, Link } from "react-router-dom";

//component styling
const styles = {
  title: {
    marginTop: "16px",
    textAlign: "center"
  },
  items_completed_ratio: {
    textAlign: "center"
  }
};

// declares the View Collection page
class ViewCollectionPage extends Component {
  // on page load
  constructor(props) {
    super(props);

    //bind the functions
    this.loadInData = this.loadInData.bind(this);

    if (this.props.collection_selected) {
      this.state = {
        selected_collection: null,
        collection_items: [],
        invalid: false
      };

      this.loadInData();
    } else {
      this.state = {
        invalid: true
      };
    }

    //// DEBUG:
    console.log(this.props);
  }

  //loads the selected collection and the collection items from the server
  loadInData() {
    let { selected_collection_idx } = this.props;

    ApiInterface.getCollection(selected_collection_idx)
      .then(
        function(collection) {
          this.setState({
            ...this.state,
            selected_collection: collection
          });

          return ApiInterface.getCollectionItems(selected_collection_idx);
        }.bind(this)
      )
      .then(
        function(collection_items) {
          this.setState({
            ...this.state,
            collection_items
          });
        }.bind(this)
      )
      .catch(function(err) {
        console.log(err);
        console.log("May be error with server");
      });
  }

  // renders the component
  render() {
    const { classes } = this.props;

    if (this.state.invalid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="ViewCollectionPage">
        {this.state.selected_collection !== null && (
          <Typography variant="display2" className={classes.title}>
            Viewing {this.state.selected_collection.name}
          </Typography>
        )}

        <Typography
          variant="display1"
          className={classes.items_completed_ratio}
        >
          Completed
          {/**{this.props.items_completed} / {this.props.collection_size} DEBUG **/}
        </Typography>

        <div>
          <ItemGrid items={this.state.collection_items} />
        </div>
      </div>
    );
  }
}

//styling helper config
ViewCollectionPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewCollectionPage);
