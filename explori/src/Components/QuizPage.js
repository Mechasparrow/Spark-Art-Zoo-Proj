/**
QuizPage.js

Page of application that quizes the user if they know information about the paintings

**/

//React
import React, { Component } from "react";

//libs
import nlp from "compromise";
import _ from "lodash";

// Quiz Gen
import QuizGen from "../Lib/QuizGen";

// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//Material components

//typography
import Typography from "@material-ui/core/Typography";

//form selection
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

//button
import Button from "@material-ui/core/Button";

//Routing
import { Redirect } from "react-router-dom";

//styling
const styles = {
  quiz_container: {
    width: 500,
    marginLeft: "auto",
    marginRight: "auto"
  },
  item_title: {
    marginTop: "16px"
  },
  quiz_prompt: {
    marginTop: "8px"
  },
  quiz_options: {
    marginTop: "32px"
  },
  submit_btn: {
    float: "right"
  }
};

//Declare the QuizPage class
class QuizPage extends Component {
  constructor(props) {
    super(props);

    //TODO pull the selected item

    let selected_collection = this.props.collections[
      this.props.selected_collection_idx
    ];
    let selected_item = selected_collection.items[this.props.selected_item_idx];

    //set starting state
    this.state = {
      selected: "choice1",
      submitted: false,
      correct: null,
      selected_item: selected_item,
      quiz: new QuizGen(selected_item.description, this.props.quiz_options)
    };

    //binding functions
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.renderChoices = this.renderChoices.bind(this);
    this.submit = this.submit.bind(this);

    //debugging
    console.log(this.state.quiz);
  }

  //Submits the quiz
  submit(e) {
    let { selected } = this.state;

    let selected_choice = _.find(this.state.quiz.choices, function(choice) {
      return choice.value === selected;
    });

    var correct;

    if (selected_choice.correct) {
      correct = true;
      this.props.incrementScore();
    } else {
      correct = false;
    }

    this.setState({
      ...this.state,
      submitted: true,
      correct
    });
  }

  //Handles the Radio change
  handleRadioChange(e) {
    let { value } = e.target;

    this.setState({
      ...this.state,
      selected: value
    });
  }

  renderChoices() {
    let rendered_choices = [];

    _.map(this.state.quiz.choices, function(choice, idx) {
      rendered_choices.push(
        <FormControlLabel
          key={idx}
          value={choice.value}
          control={<Radio />}
          label={choice.text}
        />
      );
    });

    return rendered_choices;
  }

  //Render the QuizPage
  render() {
    const { classes } = this.props;

    //check if we submitted the quiz
    if (this.state.submitted) {
      if (this.state.correct) {
        return <Redirect push to="/quiz-complete" />;
      } else {
        return <Redirect push to="/quiz-failed" />;
      }
    }

    return (
      <div className="QuizPage">
        <div className={classes.quiz_container}>
          <div className={classes.content}>
            <div className={classes.item_title}>
              <Typography variant="display2">
                Quiz {this.state.selected_item.title}
              </Typography>
            </div>
            <div className={classes.quiz_prompt}>
              <Typography paragraph variant="body1">
                {this.state.quiz.description}
              </Typography>
            </div>
          </div>
          <div className={classes.quiz_options}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Quiz Choices</FormLabel>
              <RadioGroup
                aria-label="Quiz Options"
                name="quiz_option"
                value={this.state.selected}
                onChange={this.handleRadioChange}
                className={classes.group}
              >
                {this.renderChoices()}
              </RadioGroup>
            </FormControl>
          </div>
          <div className={classes.submit_btn}>
            <Button
              onClick={this.submit}
              variant="contained"
              component="span"
              color="primary"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

//styling config helper
QuizPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizPage);
