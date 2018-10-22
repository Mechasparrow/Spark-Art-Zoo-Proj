/**
Componenets/ItemCard.js

Card that displays the item info

**/

//react lib
import React, { Component } from "react";

//util lib
import _ from "lodash";

//material ui
import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

//Routing
import { Link, Redirect } from "react-router-dom";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//styling
const styles = {
  card: {
    minWidth: 245
  },
  title: {
    marginBottom: 16,
    padding: "8px"
  },
  card_image_container: {
    textAlign: "center"
  },
  card_image: {
    maxWidth: "200px"
  },
  completed: {
    color: "green"
  },
  uncomplete: {
    color: "red"
  },
  actions: {}
};

//declare ItemCard class

class ItemCard extends Component {
  constructor(props) {
    super(props);

    //bind the functions
    this.selectItem = this.selectItem.bind(this);
    this.setItemCompleted = this.setItemCompleted.bind(this);

    this.state = {
      item_selected: false,
      item_completed: false
    };
  }

  componentDidMount() {
    this.setItemCompleted();
  }

  //sets whether the item has been completed
  setItemCompleted() {
    let { completed_items, item } = this.props;

    let is_item_completed =
      _.find(completed_items, function(completed_item) {
        return completed_item.item_id === item.id;
      }) !== undefined;

    console.log(is_item_completed);

    this.setState({
      ...this.state,
      item_completed: is_item_completed
    });
  }

  //selects the item
  selectItem() {
    let { item } = this.props;

    this.props.selectItem(item.id);

    this.setState({
      ...this.state,
      item_selected: true
    });
  }

  //renders the item card
  render() {
    const { classes } = this.props;

    //if the item is selected, redirect to the item view
    if (this.state.item_selected === true) {
      return <Redirect push to="/view-item" />;
    }

    return (
      <div className="ItemCard">
        <Card className={classes.card}>
          <CardContent>
            <Typography
              variant="headline"
              component="h2"
              className={classes.title}
            >
              {this.props.item.title}
            </Typography>

            <Typography
              variant="subheading"
              component="h2"
              className={classes.completed}
            >
              {this.state.item_completed && (
                <p className={classes.completed}>Complete</p>
              )}
              {!this.state.item_completed && (
                <p className={classes.uncomplete}>Not Complete</p>
              )}
            </Typography>

            <div className={classes.card_image_container}>
              <img
                className={classes.card_image}
                src={this.props.item.image_link}
              />
            </div>
          </CardContent>

          <CardActions className={classes.actions}>
            <Button
              disabled={this.state.item_completed}
              size="small"
              onClick={this.selectItem}
            >
              Start
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

//styling helper config
ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemCard);
