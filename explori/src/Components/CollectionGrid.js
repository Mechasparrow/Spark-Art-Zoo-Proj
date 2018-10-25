/**

CollectionGrid.js

Creates a grid of showcases all the collections
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
import CollectionCard from "../Containers/CollectionCardContainer";
import EmptyCard from "./EmptyCard";

//Api
import ApiInterface from '../Lib/ApiInterface';

//CollectionGrid component
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

class CollectionGrid extends Component {
  constructor(props) {
    super(props);

    //bind the functions
    this.get_collection_completed = this.get_collection_completed.bind(this);
    this.loadInData = this.loadInData.bind(this);

    this.state = {
      collections: [],
      completed_collections: []
    }

    console.log("grid");

  }

  componentDidUpdate(oldProps) {
    if (this.props !== oldProps) {
      this.loadInData();
    }
  }

  componentDidMount() {
    this.loadInData();
  }


  loadInData() {
    return new Promise (function (resolve, reject) {
        ApiInterface.getSourceCollections(this.props.selected_source_id).then (function (collections) {

          console.log("loaded collections");
          console.log(collections);

          this.setState({
            ...this.state,
            collections
          })

          var completed_collections_promise = _.map(collections, function (collection) {
            return new Promise ((resolve, reject) => {
              this.get_collection_completed(collection).then (function (complete) {
                resolve ({
                  collection_id: collection.id,
                  complete
                })
              }).catch (function (err) {
                reject(err);
              })
            });
          }.bind(this))

          return Promise.all(completed_collections_promise)

        }.bind(this)).then (function (raw_completed_collections) {

          let completed_collections = _.map(_.filter(raw_completed_collections, function (completed_collection) {
            return completed_collection.complete === true
          }), function (completed_collection) {
            return completed_collection.collection_id
          });

          this.setState({
            ...this.state,
            completed_collections
          })

        }.bind(this)).catch (function (err) {
          reject(err);
        })

    }.bind(this))
  }



  //Generates a grid of collection cards
  //takes in items for the grid
  // takes in the # of items that can be on a given row
  generateGrid(items, itemsPerRow) {
    let items_length = items.length;

    let grid = [];
    let current_row = [];

    let row = 1;

    _.map(
      items,
      function(item, idx) {
        //push a new exhibit item to the current row of the grid

        let collection_completed = (_.find(this.state.completed_collections, function (coll_id) {
          return coll_id === item.id;
        }) !== undefined);

        current_row.push(
          <Grid md={4} key={idx} item>
            <CollectionCard idx={idx} collection={item} completed = {collection_completed}/>
          </Grid>
        );

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
      }.bind(this)
    );

    return grid;
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

  //Renders the grid component
  render() {
    //styling classes
    const { classes } = this.props;

    return (
      <div className="CollectionCard">
        <Grid container className={classes.root}>
          {this.generateGrid(this.state.collections, this.props.rowlength)}
        </Grid>
      </div>
    );
  }
}

//helper for styling
CollectionGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CollectionGrid);
