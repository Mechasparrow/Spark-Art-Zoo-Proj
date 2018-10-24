/**

./Components/BadgeGrid.js

Grid of Badges

**/

//react lib
import React, { Component } from "react";

//util lib
import _ from "lodash";

//components
import BadgeCard from "./BadgeCard";
import EmptyCard from "./EmptyCard";

//models
import Item from "../Models/Item";

//material ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//styling for component
const styles = {
  grid_item: {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: "16px"
  },
  grid_row: {},
  root_grid: {
    marginBottom: "16px"
  }
};

//declares the item grid
class BadgeGrid extends Component {
  constructor(props) {
    super(props);

    //bind the functions
    this.getBadgeCompleted = this.getBadgeCompleted.bind(this);
    this.getBadgeCollection = this.getBadgeCollection.bind(this);
    this.renderGrid = this.renderGrid.bind(this);
  }

  //renders the grid with a certain amnt of items per row
  renderGrid(itemsPerRow) {
    const { classes } = this.props;
    console.log(classes);

    let items = this.props.badges;
    let items_length = items.length;

    let grid = [];
    let current_row = [];

    let row = 1;

    _.map(
      items,
      function(item, idx) {
        let badge_collection = this.getBadgeCollection(item);
        let badge_completed = this.getBadgeCompleted(item);

        current_row.push(
          <Grid className={classes.grid_item} md={4} key={idx} item>
            <BadgeCard
              idx={idx}
              badge={item}
              completed={badge_completed}
              collection={badge_collection}
            />
          </Grid>
        );

        //if we have completely filled a row, or have exhausted all our items, push the row to the grid
        if ((idx + 1) % itemsPerRow === 0 || idx + 1 === items_length) {
          console.log("row completed");
          grid.push(
            <Grid
              key={row}
              item
              container
              className={classes.grid_row}
              justify="center"
            >
              {current_row}
            </Grid>
          );

          row++;
          current_row = [];
        }
      }.bind(this)
    );

    //returns the grid
    return (
      <Grid container className={classes.root_grid}>
        {grid}
      </Grid>
    );
  }

  //gets the associated badges collection
  getBadgeCollection(badge) {
    let { collections } = this.props;

    let badge_collection = _.find(collections, function(collection) {
      return collection.id === badge.collection;
    });

    return badge_collection;
  }

  //checks to see if the badge was completed
  getBadgeCompleted(badge) {
    let { completedCollections } = this.props;

    let completed_badge = _.find(completedCollections, function(
      completed_collection
    ) {
      return completed_collection.id === badge.collection;
    });

    let badge_completed = completed_badge !== undefined;

    return badge_completed;
  }

  //{this.renderGrid(2)}
  //render the component
  render() {
    const { classes } = this.props;

    return <div className="BadgeGrid">{this.renderGrid(2)}</div>;
  }
}

//styling helper config
BadgeGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BadgeGrid);
