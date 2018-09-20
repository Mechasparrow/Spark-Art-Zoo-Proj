import React, {Component} from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//Material elements
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 245,
    marginLeft: '20%',
    marginRight: '20%'
  },
  title: {
    marginBottom: 16,
    padding: '8px'
  }
}

class ExhibitItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;

    return (
      <div className = "ExhibitItem">
        <Card className = {classes.card}>
          <Typography variant = "headline" component = "h2" className = {classes.title}>
            Hello world
          </Typography>
        </Card>
      </div>
    )
  }

}

ExhibitItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExhibitItem);
