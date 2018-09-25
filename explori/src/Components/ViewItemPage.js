import React, { Component } from "react";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// Material
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

//Routing
import { Link } from "react-router-dom";

const styles = {
  title: {
    textAlign: "center"
  },
  item_img: {
    marginTop: "32px",
    border: "2px solid black",
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
  },
  view_item_link: {
    textDecoration: "none",
    color: "inherit"
  }
};

class ViewItemPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    //TODO switch to Typography

    return (
      <div className="ViewItemPage">
        <div className={classes.item_img} />

        <div className={classes.item_desc}>
          <Typography variant="headline" component="h2">
            Lorem
          </Typography>

          <Typography paragraph component="p" variant="body1">
            Lorem Ipsum.Lorem Ipsum.Lorem Ipsum.Lorem Ipsum.Lorem Ipsum.Lorem
            Ipsum
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

ViewItemPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewItemPage);
