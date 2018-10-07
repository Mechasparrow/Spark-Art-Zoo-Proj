/**
./Lib/ManualQuizGen.js

Utility class that deals with the creation and handling of manual quizs for knowledge verification

**/

//Quiz Interface
import Quiz from "./Quiz";

// Util libs
import nlp from "compromise";
import _ from "lodash";

//Declare the class
class ManualQuizGen extends Quiz {
  /**
    constructor(item_desc, extra_choices)

    function for creation of object
    requires the description of the item and its extra choices to use for potential quiz answers
  **/

  constructor(item_desc, choices, selected_text) {
    let q_description = ManualQuizGen.quiz_desc(selected_text, item_desc);

    let q_choices = ManualQuizGen.generate_choices(selected_text, choices);

    super(q_description, q_choices);
  }

  /**
    generate_choices(correct_choice, extra_choices)

    Generate the choices in the correct format for the quiz
  **/

  static generate_choices(correct_choice, additional_choices) {
    let choices = [];

    choices.push({
      correct: true,
      text: correct_choice
    });

    for (var i = 0; i < 3; i++) {
      choices.push({
        correct: false,
        text: additional_choices[i]
      });
    }

    choices = _.map(_.shuffle(choices), function(choice, idx) {
      let new_choice = _.clone(choice);
      new_choice["value"] = "choice" + (idx + 1).toString();
      return new_choice;
    });

    return choices;
  }

  /**
    quiz_desc(selected_text, item_desc)

    creates the description for the quiz that has the selected text(answer text) ommitted from the description

  **/

  static quiz_desc(selected_text, item_desc) {
    let noun_length = selected_text.length;

    let blank_string_list = [];

    for (var i = 0; i < noun_length; i++) {
      if (i === 0) {
        blank_string_list.push(" ");
        continue;
      }

      blank_string_list.push("_");
    }

    console.log(blank_string_list);
    let blank_string = blank_string_list.join("");

    const new_desc = item_desc.replace(selected_text, blank_string);

    return new_desc;
  }
}

export default ManualQuizGen;
