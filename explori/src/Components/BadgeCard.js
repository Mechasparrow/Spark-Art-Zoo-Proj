/**

./Components/BadgeCard.js

displays a (un)completed badge

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
  complete: {
    opacity: 1
  },
  uncomplete: {
    backgroundColor: "lightgrey",
    opacity: 0.25
  },
  actions: {}
};

//declare BadgeCard class

class BadgeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: false
    };
  }

  //renders the item card
  render() {
    const { classes } = this.props;

    let completed_class = classes.uncomplete;

    if (this.props.completed) {
      completed_class = classes.complete;
    } else {
      completed_class = classes.uncomplete;
    }

    return (
      <div className="BadgeCard">
        <Card className={classes.card}>
          <div className={completed_class}>
            <CardContent>
              <Typography
                variant="headline"
                component="h2"
                className={classes.title}
              >
                {this.props.collection.name}
              </Typography>

              <div className={classes.card_image_container}>
                <img
                  src={this.props.badge.image_link}
                  className={classes.card_image}
                />
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
}

//styling helper config
BadgeCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BadgeCard);
