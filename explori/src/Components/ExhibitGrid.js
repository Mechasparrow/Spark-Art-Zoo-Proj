//react js
import React, {Component} from 'react';

//util lib
import _ from 'lodash';

//prop types + styling
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//material grid
import Grid from '@material-ui/core/Grid';

//individual exhibit item
import ExhibitItem from "./ExhibitItem";
import EmptyItem from './EmptyItem';

//ExhibitGrid component
// takes in the row length and the exhibit items to render
/**

props:
collection: list of collections
row_length: length per row
**/

const styles = {
  root: {
    paddingLeft: '32px',
    paddingRight: '32px'
  }
}

class ExhibitGrid extends Component {

  constructor(props) {
    super(props)
  }

  //Generates a 2x2 grid of Exhibit Items
  generateGrid(items, itemsPerRow) {


    let items_length = items.length;

    let grid = [];
    let current_row = [];

    let row = 1;

    _.map(items, function (item, idx) {

      current_row.push(

          <Grid sm = {4} item>
            <ExhibitItem collection = {item}>
            </ExhibitItem>
          </Grid>

      )

      if ((idx + 1) === items_length) {
        if (current_row.length < itemsPerRow) {
          let empty_items_cnt = itemsPerRow - current_row.length;
          for (var c = 0; c < empty_items_cnt; c++) {
            current_row.push(
              <Grid key = {idx + 100} item>
                <EmptyItem></EmptyItem>
              </Grid>
            )
          }
        }
      }

      if ((((idx + 1) % itemsPerRow) === 0) || (idx + 1) === items_length) {
        console.log("row completed")
        grid.push (
          <Grid
            key = {row}
            item
            style = {{marginTop: '16px'}}
            justify="center"
            container
            spacing = {32}>
            {current_row}
          </Grid>
        );

        row++;
        current_row = [];
      }

    });

    return grid;

  }

  //Renders the component
  render() {
    //styling classes
    const {classes} = this.props;

    //component prop data
    const {collections, rowlength} = this.props;

    return (
      <div className = "ExhibitGrid">

          <Grid container className = {classes.root}>
            {this.generateGrid(collections, rowlength)}
          </Grid>

      </div>
    )
  }

}

ExhibitGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExhibitGrid);
