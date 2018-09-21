import React, {Component} from 'react';

// Styling for JavaScript
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    minWidth: '245px'
  }
}

class EmptyItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;

    return (
      <div className = {classes.root}>

      </div>
    )
  }

}

EmptyItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmptyItem);
