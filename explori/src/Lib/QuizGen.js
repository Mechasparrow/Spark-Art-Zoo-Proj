import nlp from "compromise";
import _ from "lodash";

class QuizGen {
  constructor(item_desc, extra_choices) {
    this.selected_text = QuizGen.grab_noun(item_desc).text;
    this.description = QuizGen.quiz_desc(this.selected_text, item_desc);

    this.choices = QuizGen.generate_choices(this.selected_text, extra_choices);
  }

  static generate_choices(correct_choice, extra_choices) {
    let choices = [];

    choices.push({
      correct: true,
      text: correct_choice
    });

    for (var i = 0; i < 3; i++) {
      choices.push({
        correct: false,
        text: _.sample(extra_choices)
      });
    }

    choices = _.map(_.shuffle(choices), function(choice, idx) {
      let new_choice = _.clone(choice);
      new_choice["value"] = "choice" + (idx + 1).toString();
      return new_choice;
    });

    return choices;
  }

  static grab_noun(desc) {
    let doc = nlp(desc);

    let nouns = doc.nouns().data();
    console.log(nouns);

    let random_noun = _.sample(nouns);

    return random_noun;
  }

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

export default QuizGen;
