/**
ExhibitItem.js

Renders a item for a exhibit

**/

// React JS
import React, { Component } from "react";

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
  view_item_link: {
    textDecoration: "none",
    color: "#000000"
  },
  actions: {}
};

// Displays info regarding Collection
// Takes in Collection as a prop (collection)

//declares the exhibit item
class ExhibitItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item_selected: false
    }

    //bind functions
    this.select_collection = this.select_collection.bind(this);
  }

  //selects the collection
  select_collection() {

    this.props.select_collection(this.props.idx);

  }

  //render the component
  render() {
    const { classes, collection } = this.props;

    return (
      <div className="ExhibitItem">
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
              <Button onClick = {this.select_collection} size="small">View</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

//helper for styling
ExhibitItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExhibitItem);
