/**
ViewItemPage.js

Page that renders a specific Item from a Collection


**/

//react
import React, { Component } from "react";

//sumjs
import sum from "sum";

//lodash
import _ from "lodash";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// Material
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// Models
import Collection from "../Models/Collection";

//api interface
import ApiInterface from "../Lib/ApiInterface";

//Routing
import { Redirect, Link } from "react-router-dom";

//Component styling
const styles = {
  title: {},
  item_img_container: {
    textAlign: "center"
  },
  item_img: {
    marginTop: "32px",
    border: "2px solid black",
    width: "300px",
    backgroundColor: "white"
  },
  item_desc: {
    marginTop: "56px",
    marginLeft: "15%",
    marginRight: "15%"
  },
  quiz_btn_container: {
    marginLeft: "15%",
    marginRight: "15%"
  },
  quiz_start: {
    marginTop: "32px",
    float: "right"
  },
  view_item_link: {
    textDecoration: "none",
    color: "inherit"
  }
};

//Declare the ViewItemPage Component
class ViewItemPage extends Component {
  constructor(props) {
    super(props);

    //bind the functions
    this.loadInData = this.loadInData.bind(this);
    this.checkQuizable = this.checkQuizable.bind(this);

    //if the item has been selected with a valid collection

    if (this.props.collection_item_selected) {
      this.state = {
        selected_collection: null,
        item: null,
        item_summary: null,
        valid: true
      };

      this.loadInData();
    } else {
      //if not valid, set the state to valid: false
      //redirect back to home

      this.state = {
        valid: false
      };
    }

    console.log(this.state);
  }

  //checks if the item being viewed is quizable
  checkQuizable() {

    let {item} = this.state;

    if (item !== null) {
      if (item.description !== "" && item.description !== null) {
        return true;
      }else {
        return false;
      }
    }else {
      return false;
    }

  }


  //loads in the selected collection and the selected item
  loadInData() {
    let {
      selected_item_idx,
      selected_collection_idx,
      completed_items
    } = this.props;

    ApiInterface.getCollection(selected_collection_idx)
      .then(
        function(collection) {
          //update component state with selected collection
          this.setState({
            ...this.state,
            selected_collection: collection
          });

          if (selected_item_idx !== null) {
            return ApiInterface.getItem(selected_item_idx);
          } else {
            return new Promise(function(resolve, reject) {
              ApiInterface.getCollectionItems(collection.id)
                .then(function(items) {
                  //filter through items that have been completed
                  var usable_items = _.filter(items, function(item) {
                    let item_completed =
                      _.find(completed_items, function(completed_item) {
                        return completed_item.item_id === item.id;
                      }) !== undefined;

                    return !item_completed;
                  });

                  //if none uncompleted, return null
                  if (usable_items.length <= 0) {
                    resolve(null);
                  } else {
                    //else return a random uncompleted item
                    let rando_item = _.sample(usable_items);
                    resolve(rando_item);
                  }
                })
                .catch(function(err) {
                  reject(err);
                });
            });
          }
        }.bind(this)
      )
      .then(
        function(item) {
          //if uncompleted, set the state to be invalid and return

          let item_invalid = false;

          //check if item invalid
          if (item === null) {
            item_invalid = true;
          } else {
            let item_completed =
              _.find(completed_items, function(completed_item) {
                return completed_item.item_id === item.id;
              }) !== undefined;

            item_invalid = item_completed;
          }

          if (item_invalid) {
            this.setState({
              ...this.state,
              valid: false
            });

            return;
          }

          // summarize the item
          if (item.description != "" && item.description != null) {
            var item_abstract = sum({
              corpus: item.description,
              nSentences: 3
            });

            var item_summary = item_abstract.summary;
          } else {
            var item_summary = "";
          }

          //update the state with selected item and summmary
          this.setState({
            ...this.state,
            item,
            item_summary
          });

          //select the item
          this.props.select_item(item.id);
        }.bind(this)
      )
      .catch(function(err) {
        console.log(err);
        console.log("Error with server perhaps");
      });
  }

  // grabs a random item from the collection to display
  randomItem(collection) {
    return _.sample(collection.items);
  }

  //Render the View Item Page
  render() {
    const { classes } = this.props;

    if (this.state.valid === false) {
      return <Redirect to="/" />;
    }

    if (this.state.item !== null) {
      return (
        <div className="ViewItemPage">
          <div className={classes.item_img_container}>
            <img
              className={classes.item_img}
              src={this.state.item.image_link}
            />
          </div>

          <div className={classes.item_desc}>
            <Typography variant="headline" component="h2">
              {this.state.item.title}
            </Typography>

            <Typography variant="subheading" component="h2">
              by {this.state.item.author}
            </Typography>

            <Typography paragraph component="p" variant="body1">
              {this.state.item_summary}
            </Typography>
          </div>

          <div className={classes.quiz_btn_container}>
            <Link className={classes.view_item_link} to="/quiz-page">
              <Button
                className={classes.quiz_start}
                color="primary"
                variant="contained"
                component="span"
                size="large"
                disabled = {!this.checkQuizable()}
              >
                Quiz
              </Button>
            </Link>
          </div>
        </div>
      );
    } else {
      return <p>Loading data...</p>;
    }
  }
}

//styling config helper
ViewItemPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewItemPage);
