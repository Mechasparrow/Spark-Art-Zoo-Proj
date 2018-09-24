import React, { Component } from "react";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// Material
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = {
  title: {
    textAlign: "center"
  },
  item_img: {
    width: "200px",
    height: "200px",
    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto"
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
  }
};

class ViewItemPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="ViewItemPage">
        <h2 className={classes.title}>Viewing ...</h2>

        <div className={classes.item_img} />

        <div className={classes.item_desc}>
          <h2>Lorem</h2>
          <p>
            Lorem Ipsum.Lorem Ipsum.Lorem Ipsum.Lorem Ipsum.Lorem Ipsum.Lorem
            Ipsum
          </p>
        </div>

        <div className={classes.quiz_btn_container}>
          <Button
            className={classes.quiz_start}
            color="primary"
            variant="contained"
            component="span"
            size="large"
          >
            Quiz
          </Button>
        </div>
      </div>
    );
  }
}

ViewItemPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewItemPage);
