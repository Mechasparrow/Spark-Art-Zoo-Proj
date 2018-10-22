/**
ScannerPage.js

The Scanner Page to scan QR codes

**/

//react
import React, { Component } from "react";

//util libs
import Instascan from "instascan";

//routing
import { Redirect } from "react-router-dom";

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
      item_selected: false
    };

    this.scannerElemRef = React.createRef();
  }

  componentWillUnmount() {
    this.scanner.stop();
  }

  componentDidMount() {
    var current_elem = this.scannerElemRef.current;

    this.scanner = new Instascan.Scanner({ video: current_elem });

    this.scanner.addListener(
      "scan",
      function(content) {
        var item_idx = parseInt(content);

        console.log(item_idx);
        if (item_idx.toString() !== "NaN") {
          this.props.selectItemAndCollection(
            item_idx,
            function() {
              this.setState({
                ...this.state,
                item_selected: true
              });
              this.scanner.stop();
            }.bind(this)
          );
        } else {
          alert("invalid QR Code");
        }
      }.bind(this)
    );

    Instascan.Camera.getCameras()
      .then(
        function(cameras) {
          if (cameras.length > 0) {
            this.scanner.start(cameras[0]);
          } else {
            console.error("No cameras found.");
          }
        }.bind(this)
      )
      .catch(function(e) {
        console.error(e);
      });

    console.log(this.scanner);
  }

  //Render the Scanner Page
  render() {
    const { classes } = this.props;

    //if item selected value scanned, redirect
    if (this.state.item_selected) {
      return <Redirect to="/view-item" />;
    }

    return (
      <div className="ScannerPage">
        <Typography variant="display2" className={classes.title}>
          Scanner
        </Typography>

        <div className={classes.video_container}>
          <video className={classes.video} ref={this.scannerElemRef} />
        </div>
      </div>
    );
  }
}

//styling helper config
ScannerPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScannerPage);
