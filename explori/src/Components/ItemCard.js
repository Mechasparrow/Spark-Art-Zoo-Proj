import React, { Component } from "react";

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
    maxHeight: "200px"
  },
  actions: {}
};

class ItemCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item_selected: false
    };

    this.selectItem = this.selectItem.bind(this);
  }

  selectItem() {
    this.props.selectItem(this.props.idx);

    this.setState({
      ...this.state,
      item_selected: true
    });
  }

  render() {
    const { classes } = this.props;

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

            <div className={classes.card_image_container}>
              <img
                className={classes.card_image}
                src={this.props.item.image_link}
              />
            </div>
          </CardContent>

          <CardActions className={classes.actions}>
            <Button size="small" onClick={this.selectItem}>
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
