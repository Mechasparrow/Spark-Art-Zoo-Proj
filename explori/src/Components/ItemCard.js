import React, {Component} from 'react';

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
  actions: {}
};

class ItemCard extends Component {

  constructor(props) {

    super(props);
  }

  render() {

    const {classes} = this.props;

    return (
      <div className = "ItemCard">
        <Card className={classes.card}>
          <CardContent>
            <Typography
              variant="headline"
              component="h2"
              className={classes.title}
            >
              {this.props.item.title}
            </Typography>

          </CardContent>

          <CardActions className={classes.actions}>
              <Button size="small">Start</Button>
          </CardActions>
        </Card>
      </div>
    )


  }

}

//styling helper config
ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemCard);
