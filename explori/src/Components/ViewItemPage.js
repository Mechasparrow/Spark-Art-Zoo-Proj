/**
ViewItemPage.js

Page that renders a specific Item from a Collection


**/

//react
import React, { Component } from "react";

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

//Routing
import { Link } from "react-router-dom";

//Component styling
const styles = {
  title: {
    textAlign: "center"
  },
  item_img_container: {
    textAlign: "center"
  },
  item_img: {
    marginTop: "32px",
    border: "2px solid black",
    width: "200px",
    backgroundColor: "white"
  },
  item_desc: {
    marginTop: "56px",
    maxWidth: "350px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  quiz_btn_container: {
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  quiz_start: {
    marginTop: "32px",
    marginRight: "24px",
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

    const selected_collection = this.props.collections[
      this.props.selected_collection_idx
    ];

    //grab a random item
    const random_item = this.randomItem(selected_collection);
    const random_item_idx = _.findIndex(selected_collection.items, random_item);

    this.props.select_item(random_item_idx);

    this.state = {
      selected_collection,
      item: random_item
    };

    console.log(this.state);
  }

  //TODO grabs a random item from the collection to display
  randomItem(collection) {
    return _.sample(collection.items);
  }

  //Render the View Item Page
  render() {
    const { classes } = this.props;

    return (
      <div className="ViewItemPage">
        <div className={classes.item_img_container}>
          <img className={classes.item_img} src={this.state.item.image_link} />
        </div>

        <div className={classes.item_desc}>
          <Typography variant="headline" component="h2">
            {this.state.item.title}
          </Typography>

          <Typography variant="subheading" component="h2">
            by {this.state.item.author}
          </Typography>

          <Typography paragraph component="p" variant="body1">
            {this.state.item.description}
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
            >
              Quiz
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

//styling config helper
ViewItemPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewItemPage);
