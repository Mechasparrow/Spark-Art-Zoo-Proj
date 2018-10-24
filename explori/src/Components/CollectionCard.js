/**
CollectionCard.js

Renders a collection info in a card form

**/

// React JS
import React, { Component } from "react";

//util
import _ from "lodash";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//Api
import ApiInterface from "../Lib/ApiInterface";

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
      collection_completed: false,
      view_all: false
    };

    //bind functions
    this.select_collection = this.select_collection.bind(this);
    this.view_collection = this.view_collection.bind(this);
    this.get_collection_completed = this.get_collection_completed.bind(this);
  }

  componentDidMount() {
    this.get_collection_completed();
  }

  //sets boolean as to whether all the items of collection has been completed
  //then it updates state
  get_collection_completed() {
    let { collection, completed_items } = this.props;

    ApiInterface.getCollectionItems(collection.id).then(
      function(items) {
        var uncompleted_items = _.filter(items, function(item) {
          let item_completed =
            _.find(completed_items, function(completed_item) {
              return completed_item.item_id === item.id;
            }) !== undefined;

          return !item_completed;
        });

        let collection_completed = uncompleted_items.length === 0;

        this.setState({
          ...this.state,
          collection_completed
        });
      }.bind(this)
    );
  }

  //selects the collection
  select_collection() {
    let { collection } = this.props;

    this.props.select_collection(collection.id);

    this.setState({
      ...this.state,
      item_selected: true
    });
  }

  //views the entire collection
  view_collection() {
    let { collection } = this.props;

    this.props.select_collection(collection.id);

    this.setState({
      ...this.state,
      view_all: true
    });
  }

  //render the card-based component
  render() {
    const { classes, collection } = this.props;

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
            <Button
              disabled={this.state.collection_completed}
              onClick={this.select_collection}
              size="small"
            >
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
