/**
QuizPage.js

Page of application that quizes the user if they know information about the paintings

**/

//React
import React, { Component } from "react";

//libs
import nlp from "compromise";
import _ from "lodash";
import sum from "sum";

//models
import Item from "../Models/Item";

// Api
import ApiInterface from "../Lib/ApiInterface";

// Quiz Gen
import QuizGen from "../Lib/Quiz/QuizGen";
import Quiz from "../Lib/Quiz/Quiz";
import ManualQuizGen from "../Lib/Quiz/ManualQuizGen";

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
    marginLeft: "20%",
    marginRight: "20%",
    flexGrow: 1
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
  // on page load
  constructor(props) {
    super(props);

    //binding functions
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.renderChoices = this.renderChoices.bind(this);
    this.submit = this.submit.bind(this);
    this.loadInData = this.loadInData.bind(this);

    if (this.props.quiz_selected === true) {
      //create empty quiz to start
      var generated_quiz = Quiz.empty();

      //set starting state
      const item_abstract = sum({ corpus: "I haz cake", nSentences: 3 });

      /** FIXME
      if (
        selected_item.extra_options !== null &&
        selected_item.selected_text !== null
      ) {
        generated_quiz = new ManualQuizGen(
          selected_item.description,
          selected_item.extra_options,
          selected_item.selected_text
        );
      } else {
        generated_quiz = new QuizGen(
          item_abstract.summary,
          this.props.quiz_options
        );
      }
      **/

      //DEBUG
      let dummy_item = Item.parse({
        title: "Mask",
        author: "Nigeria",
        image_link: "...",
        description: "A mask",
        extra_options: ["nope", "nope", "nope"],
        selected_text: "mask"
      });

      let dummy_quiz = new QuizGen(
        dummy_item.description,
        this.props.quiz_options
      );

      this.state = {
        selected: "choice1",
        submitted: false,
        correct: null,
        selected_item: dummy_item,
        quiz: dummy_quiz,
        invalid: false
      };

      this.loadInData();
    } else {
      this.state = {
        invalid: true
      };
    }

    //debugging
    console.log(this.props);
  }

  //load in the data from the backend
  loadInData() {
    let loaded_data = {};

    let collection_id = this.props.selected_collection_idx;
    let item_id = this.props.selected_item_idx;

    ApiInterface.getCollection(collection_id)
      .then(function(collection) {
        _.assign(loaded_data, {
          selected_collection: collection
        });

        return ApiInterface.getItem(item_id);
      })
      .then(function(item) {
        _.assign(loaded_data, {
          selected_item: item
        });

        return ApiInterface.getItemChoices(item_id);
      })
      .then(function(choices) {
        _.assign(loaded_data, {
          item_choices: choices
        });
      })
      .then(
        function() {
          let { item_choices, selected_item } = loaded_data;

          //create empty quiz to start
          var generated_quiz = Quiz.empty();

          let choice_length = item_choices.length;

          let has_correct_choice =
            _.filter(item_choices, function(choice) {
              return choice.correct === true;
            }).length > 0;

          if (choice_length > 0 && has_correct_choice) {
            //TODO create quiz based off choices

            let correct_choice_text = _.filter(item_choices, function(choice) {
              return choice.correct === true;
            })[0]["text"];

            let other_choices_text = _.map(
              _.filter(item_choices, function(choice) {
                return choice.correct !== true;
              }),
              function(choice) {
                return choice["text"];
              }
            );

            generated_quiz = new ManualQuizGen(
              selected_item.description,
              other_choices_text,
              correct_choice_text
            );
          } else {
            //set starting state
            let item_abstract = sum({
              corpus: selected_item.description,
              nSentences: 3
            });

            generated_quiz = new QuizGen(
              item_abstract.summary,
              this.props.quiz_options
            );
          }

          this.setState({
            ...this.state,
            selected_item,
            quiz: generated_quiz
          });
        }.bind(this)
      )
      .catch(function(err) {
        console.log(err);
        console.log("May be error with server");
      });
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

      //TODO mark as correct
      this.props.completeItem(this.props.selected_item_idx);
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

  //renders the quiz choices
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

    //check if we actually have this item selected
    if (this.state.invalid) {
      return <Redirect to="/" />;
    }

    //check if we submitted the quiz
    if (this.state.submitted) {
      if (this.state.correct) {
        return <Redirect push to="/quiz-complete" />;
      } else {
        return <Redirect push to="/quiz-failed" />;
      }
    }

    //returns the jsx
    return (
      <div className="QuizPage">
        <div className={classes.quiz_container}>
          <div className={classes.content}>
            <div className={classes.item_title}>
              <Typography variant="display1">
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
