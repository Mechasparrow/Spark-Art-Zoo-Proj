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

//component styling
const styles = {
  title: {
    marginTop: '16px',
    textAlign: 'center'
  }
}

// declares the View Collection page
class ViewCollectionPage extends Component {

  // on page load
  constructor(props) {

    super(props);

    this.state = {
      selected_collection: this.props.collections[this.props.selected_collection_idx]
    }

    super(props);
  }

  // renders the component
  render() {

    const {classes} = this.props;

    return (
      <div className = "ViewCollectionPage">

        <Typography variant = "display2" className = {classes.title}>
          Viewing {this.state.selected_collection.name}
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
