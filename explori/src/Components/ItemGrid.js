import React, {Component} from 'react';

//components
import ItemCard from './ItemCard';
import EmptyItem from './EmptyItem';

//models
import Item from '../Models/Item';

//material ui
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = {

}

class ItemGrid extends Component {

  constructor(props) {
    super(props);

    this.renderGrid = this.renderGrid.bind(this);
  }

  renderGrid(classes, itemsPerRow) {

    const {classes} = this.props;

    let items = this.props.items;
    let items_length = items.length;


    let grid = [];
    let current_row = [];

    let row = 1;

    _.map(items, function (item, idx) {

      current_row.push(
        <Grid sm = {4} key = {idx} item>
          <ItemCard idx = {idx} item = {item} />
        </Grid>
      )

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

    }.bind(this))




    return (
      <Grid container className = {classes.grid}>
        {grid}
      </Grid>
    )

  }

  render() {
    const {classes} = this.props;

    return (
      <div className = "ItemGrid">
        <ItemCard item = {this.props.items[0]}></ItemCard>

        {this.renderGrid(2)}

      </div>
    )
  }

}

//styling helper config
ItemGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ItemGrid;
