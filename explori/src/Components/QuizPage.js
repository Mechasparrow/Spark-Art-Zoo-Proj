import React, {Component} from 'react';

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//Material components

//typography
import Typography from '@material-ui/core/Typography';

//form selection
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

//button
import Button from '@material-ui/core/Button';

const styles = {
  quiz_container: {
    width: 500,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  item_title: {
    marginTop: '16px'
  },
  quiz_prompt: {
    marginTop: '8px'
  },
  quiz_options: {
    marginTop: '32px'
  },
  submit_btn: {
    float: 'right'
  }
}

class QuizPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {classes} = this.props;

    return (
      <div className = "QuizPage">

        <div className = {classes.quiz_container}>
          <div className = {classes.content}>
            <div className = {classes.item_title}>

              <Typography variant = "display2">
                Quiz title
              </Typography>

            </div>
            <div className = {classes.quiz_prompt}>
              <Typography paragraph variant = "body1">
                lorem ipsum,
                lorem ipsum,
                ___________,
                lorem ipsum,
                lorem ipsum,
                lorem ipsum,
                lorem ipsum,
                lorem ipsum,
                lorem ipsum,
                lorem ipsum,
                lorem ipsum,
                lorem ipsum,
                lorem ipsum,

              </Typography>
            </div>

          </div>
          <div className = {classes.quiz_options}>
            <FormControl
              component="fieldset"
              className={classes.formControl}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="Quiz Options"
                name="quiz_option"
                value = "option1"
                className={classes.group}
                >

                <FormControlLabel
                  value="option1"
                  control={
                    <Radio />
                  }
                  label="option1" />

                <FormControlLabel
                  value="option2"
                  control={
                    <Radio />
                  }
                  label="option2" />

                  <FormControlLabel
                    value="option3"
                    control={
                      <Radio />
                    }
                    label="option3" />
                <FormControlLabel
                  value="option4"
                  control={
                    <Radio />
                  }
                  label="option4" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className = {classes.submit_btn} >
            <Button
              variant="contained"
              component = "span"
              color = "primary">
              Submit
            </Button>
          </div>

        </div>



      </div>
    )

  }

}

QuizPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizPage);
