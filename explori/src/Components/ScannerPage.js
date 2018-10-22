/**
ScannerPage.js

The Scanner Page to scan QR codes

**/

//react
import React, { Component } from "react";

//util libs
import Instascan from "instascan";

//material ui
import Typography from "@material-ui/core/Typography";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//styling
const styles = {
  title: {
    marginTop: "16px",
    textAlign: "center"
  },
  video_container: {
    textAlign: "center"
  }
};

//define the ScannerPage class

class ScannerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scanned_content: null
    };

    this.scannerElemRef = React.createRef();
  }

  componentDidMount() {
    var current_elem = this.scannerElemRef.current;

    let scanner = new Instascan.Scanner({ video: current_elem });

    scanner.addListener(
      "scan",
      function(content) {
        this.setState({
          ...this.state,
          scanned_content: content
        });

        //DEBUG redirect to appropiate item

        scanner.stop();
      }.bind(this)
    );

    Instascan.Camera.getCameras()
      .then(function(cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error("No cameras found.");
        }
      })
      .catch(function(e) {
        console.error(e);
      });

    console.log(scanner);
  }

  //Render the Scanner Page
  render() {
    const { classes } = this.props;

    return (
      <div className="ScannerPage">
        <Typography variant="display2" className={classes.title}>
          Scanner
        </Typography>

        {this.state.scanned_content === null && (
          <div className={classes.video_container}>
            <video className={classes.video} ref={this.scannerElemRef} />
          </div>
        )}

        {this.state.scanned_content !== null && (
          <div className={classes.content_scanned_container} />
        )}
      </div>
    );
  }
}

//styling helper config
ScannerPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScannerPage);
