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

//material icons
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";

//Font awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

//Social Sharing
import { FacebookButton, TwitterButton } from "react-social";

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
    padding: "8px",
    paddingBottom: "0px"
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

//sharing buttons
let FBButton = props => {
  let { classes } = props;

  return (
    <IconButton size="large" onClick={props.onClick}>
      <FontAwesomeIcon icon={faFacebook} />
    </IconButton>
  );
};

let disabledFBButton = props => {
  let { classes } = props;

  return (
    <IconButton disabled size="large" onClick={props.onClick}>
      <FontAwesomeIcon icon={faFacebook} />
    </IconButton>
  );
};

let TweetButton = props => {
  let { classes } = props;

  return (
    <IconButton size="large" onClick={props.onClick}>
      <FontAwesomeIcon icon={faTwitter} />
    </IconButton>
  );
};

let disabledTweetButton = props => {
  let { classes } = props;

  return (
    <IconButton disabled size="large" onClick={props.onClick}>
      <FontAwesomeIcon icon={faTwitter} />
    </IconButton>
  );
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

    //set a share message
    let share_message =
      "Hey, I just got the " +
      this.props.collection.name +
      " badge from Explori";

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
              <div className={classes.share_buttons}>
                {this.props.completed && (
                  <FacebookButton
                    url={"http://example.com/"}
                    appId={"553013885135102"}
                    element={FBButton}
                    message={share_message}
                  />
                )}

                {!this.props.completed && (
                  <FacebookButton
                    url={""}
                    appId={"553013885135102"}
                    element={disabledFBButton}
                    message={share_message}
                  />
                )}

                {this.props.completed && (
                  <TwitterButton
                    url={"http://example.com/"}
                    element={TweetButton}
                    message={share_message}
                  />
                )}

                {!this.props.completed && (
                  <TwitterButton
                    url={""}
                    element={disabledTweetButton}
                    message={share_message}
                  />
                )}
              </div>
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
