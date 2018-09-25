/**

ExhibitGrid.js

Creates a grid of exhibits to display

**/

//react js
import React, { Component } from "react";

//util lib
import _ from "lodash";

//prop types + styling
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//material grid
import Grid from "@material-ui/core/Grid";

//individual exhibit item
import ExhibitItem from "./ExhibitItem";
import EmptyItem from "./EmptyItem";

//ExhibitGrid component
// takes in the row length and the exhibit items to render
/**

props:
collection: list of collections
row_length: length per row
**/

//styling for component
const styles = {
  root: {
    paddingLeft: "32px",
    paddingRight: "32px"
  }
};

//Declare the component

class ExhibitGrid extends Component {
  constructor(props) {
    super(props);
  }

  //Generates a grid of Exhibit Items
  //takes in items for the grid
  // takes in the # of items that can be on a given row
  generateGrid(items, itemsPerRow) {
    let items_length = items.length;

    let grid = [];
    let current_row = [];

    let row = 1;

    _.map(items, function(item, idx) {
      //push a new exhibit item to the current row of the grid
      current_row.push(
        <Grid sm={4} item>
          <ExhibitItem collection={item} />
        </Grid>
      );

      //if the max length of items have been exhausted, complete the row with empty exhibit items
      if (idx + 1 === items_length) {
        if (current_row.length < itemsPerRow) {
          let empty_items_cnt = itemsPerRow - current_row.length;
          for (var c = 0; c < empty_items_cnt; c++) {
            current_row.push(
              <Grid key={idx + 100} item>
                <EmptyItem />
              </Grid>
            );
          }
        }
      }

      //if we have completely filled a row, or have exhausted all our items, push the row to the grid
      if ((idx + 1) % itemsPerRow === 0 || idx + 1 === items_length) {
        console.log("row completed");
        grid.push(
          <Grid
            key={row}
            item
            style={{ marginTop: "16px" }}
            justify="center"
            container
            spacing={32}
          >
            {current_row}
          </Grid>
        );

        row++;
        current_row = [];
      }
    });

    return grid;
  }

  //Renders the grid component
  render() {
    //styling classes
    const { classes } = this.props;

    //component prop data
    const { collections, rowlength } = this.props;

    return (
      <div className="ExhibitGrid">
        <Grid container className={classes.root}>
          {this.generateGrid(collections, rowlength)}
        </Grid>
      </div>
    );
  }
}

//helper for styling
ExhibitGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExhibitGrid);
