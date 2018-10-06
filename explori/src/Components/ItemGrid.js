/**
./Components/ItemGrid.js

component that renders a grid of item cards

**/

//react lib
import React, { Component } from "react";

//util lib
import _ from "lodash";

//components
import ItemCard from "../Containers/ItemCardContainer";
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
class ItemGrid extends Component {
  constructor(props) {
    super(props);

    this.renderGrid = this.renderGrid.bind(this);
  }

  //renders the grid with a certain amnt of items per row
  renderGrid(itemsPerRow) {
    const { classes } = this.props;
    console.log(classes);

    let items = this.props.items;
    let items_length = items.length;

    let grid = [];
    let current_row = [];

    let row = 1;

    _.map(
      items,
      function(item, idx) {
        current_row.push(
          <Grid className={classes.grid_item} md={4} key={idx} item>
            <ItemCard idx={idx} item={item} />
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

  //render the component
  render() {
    const { classes } = this.props;

    return <div className="ItemGrid">{this.renderGrid(2)}</div>;
  }
}

//styling helper config
ItemGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemGrid);
