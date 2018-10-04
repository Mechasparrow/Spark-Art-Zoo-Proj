/**
./Components/ViewCollectionPage.js

Pages that shows the items of a collection

**/

//react lib
import React, {Component} from 'react';

//components
import ItemGrid from './ItemGrid';

//material ui
import Typography from "@material-ui/core/Typography";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//routing
import {Redirect, Link} from 'react-router-dom';

//component styling
const styles = {
  title: {
    marginTop: '16px',
    textAlign: 'center'
  },
  items_completed_ratio: {
    textAlign: 'center'
  }
}

// declares the View Collection page
class ViewCollectionPage extends Component {

  // on page load
  constructor(props) {

    super(props);

    if (this.props.collection_selected) {
      this.state = {
        selected_collection: this.props.collections[this.props.selected_collection_idx],
        invalid: false
      }
    }else {
      this.state = {
        invalid: true
      }
    }


    //// DEBUG:
    console.log(this.props);

  }

  // renders the component
  render() {

    const {classes} = this.props;

    if (this.state.invalid) {
      return (
        <Redirect to = "/"></Redirect>
      )
    }

    return (
      <div className = "ViewCollectionPage">

        <Typography variant = "display2" className = {classes.title}>
          Viewing {this.state.selected_collection.name}
        </Typography>

        <Typography variant = "display1" className = {classes.items_completed_ratio}>
          Completed {this.props.items_completed} / {this.props.collection_size}
        </Typography>

        <div>
          <ItemGrid items = {this.state.selected_collection.items}>
          </ItemGrid>
        </div>

      </div>
    )


  }

}

//styling helper config
ViewCollectionPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewCollectionPage);
