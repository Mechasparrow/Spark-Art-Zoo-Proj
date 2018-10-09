/**
CollectionCard.js

Renders a collection info in a card form

**/

// React JS
import React, { Component } from "react";

//util
import _ from 'lodash';

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//Models
import Collection from "../Models/Collection";

//Material elements
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//Routing
import { Link, Redirect } from "react-router-dom";

//styling
const styles = {
  card: {
    minWidth: 245
  },
  title: {
    marginBottom: 16,
    padding: "8px"
  },
  actions: {}
};

// Displays info regarding Collection in card form
// Takes in Collection as a prop (collection)

//declares the exhibit item
class CollectionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item_selected: false,
      view_all: false
    };

    //bind functions
    this.select_collection = this.select_collection.bind(this);
    this.view_collection = this.view_collection.bind(this);
  }

  //selects the collection
  select_collection() {
    this.props.select_collection(this.props.idx);

    this.setState({
      ...this.state,
      item_selected: true
    });
  }

  //views the entire collection
  view_collection() {
    this.props.select_collection(this.props.idx);

    this.setState({
      ...this.state,
      view_all: true
    });
  }

  //returns boolean as to whether all the items of collection has been completed
  items_completed(collection) {
    var items_completed = false;

    var uncompleted_items = _.filter(collection.items, function (item) {
      return (item.completed !== true);
    })

    console.log(uncompleted_items)

    return (uncompleted_items.length <= 0);

  }

  //render the card-based component
  render() {
    const { classes, collection } = this.props;
    console.log(this.items_completed(collection));

    if (this.state.item_selected) {
      return <Redirect push to="/view-item" />;
    } else if (this.state.view_all) {
      return <Redirect push to="/view-collection" />;
    }

    return (
      <div className="CollectionCard">
        <Card className={classes.card}>
          <CardContent>
            <Typography
              variant="headline"
              component="h2"
              className={classes.title}
            >
              {collection.name}
            </Typography>
          </CardContent>

          <CardActions className={classes.actions}>
            <Button disabled = {this.items_completed(collection)} onClick={this.select_collection} size="small">
              Start
            </Button>
            <Button onClick={this.view_collection} size="small">
              All
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

//helper for styling
CollectionCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CollectionCard);
