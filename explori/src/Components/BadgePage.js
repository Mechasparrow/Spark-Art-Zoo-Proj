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
import Badge from "../Models/Badge";
import Collection from "../Models/Collection";
import Item from "../Models/Item";

//Routing
import { Redirect } from "react-router-dom";

//Extra components
import BadgeGrid from "./BadgeGrid";

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

    //bind the functions
    this.loadInData = this.loadInData.bind(this);
    this.get_collection_completed = this.get_collection_completed.bind(this);

    //set default state

    if (this.props.valid === true) {
      this.state = {
        collections: [],
        completed_collections: [],
        badges: [],
        earned_badges: []
      };

      this.loadInData();
    } else {
      this.state = {
        valid: false
      };
    }
  }

  //loads in the data from the server
  loadInData() {
    ApiInterface.getCollections()
      .then(
        function(collections) {
          this.setState({
            ...this.state,
            collections
          });

          let collections_completed = _.map(
            collections,
            function(collection) {
              return new Promise((resolve, reject) => {
                this.get_collection_completed(collection)
                  .then(function(completed) {
                    if (completed) {
                      resolve(collection);
                    } else {
                      resolve(null);
                    }
                  })
                  .catch(function(err) {
                    reject(err);
                  });
              });
            }.bind(this)
          );

          return Promise.all(collections_completed);
        }.bind(this)
      )
      .then(
        function(raw_completed_collections) {
          let completed_collections = _.filter(
            raw_completed_collections,
            function(collection) {
              return collection !== null;
            }
          );

          this.setState({
            ...this.state,
            completed_collections
          });

          return ApiInterface.getBadges();
        }.bind(this)
      )
      .then(
        function(badges) {
          console.log(badges);

          this.setState({
            ...this.state,
            badges
          });
        }.bind(this)
      )
      .catch(function(err) {
        console.log(err);
        console.log("may be issue with server");
      });
  }

  get_collection_completed(collection) {
    let { completed_items } = this.props;

    return new Promise((resolve, reject) => {
      ApiInterface.getCollectionItems(collection.id)
        .then(function(items) {
          var uncompleted_items = _.filter(items, function(item) {
            let item_completed =
              _.find(completed_items, function(completed_item) {
                return completed_item.item_id === item.id;
              }) !== undefined;

            return !item_completed;
          });

          let collection_completed = uncompleted_items.length === 0;

          resolve(collection_completed);
        })
        .catch(function(err) {
          reject(err);
        });
    });
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

        <div className={classes.badges_grid}>
          <BadgeGrid
            collections={this.state.collections}
            completedCollections={this.state.completed_collections}
            badges={this.state.badges}
          />
        </div>
      </div>
    );
  }
}

//styling helper config
BadgePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BadgePage);
