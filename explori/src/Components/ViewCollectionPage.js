import React, {Component} from 'react';

//components
import ItemGrid from './ItemGrid';

//material ui
import Typography from "@material-ui/core/Typography";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  title: {
    marginTop: '16px',
    textAlign: 'center'
  }
}


class ViewCollectionPage extends Component {

  constructor(props) {

    super(props);

    this.state = {
      selected_collection: this.props.collections[this.props.selected_collection_idx]
    }

    super(props);
  }

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
