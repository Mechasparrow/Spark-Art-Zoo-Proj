
import nlp from 'compromise';
import _ from 'lodash';


class QuizGen {

  static grab_noun(desc) {

    let doc = nlp(desc);

    let nouns = doc.nouns().data();
    console.log(nouns);

    let random_noun = _.sample(nouns);

    return random_noun;
  }

  static quiz_desc(item_desc) {

    let selected_noun = QuizGen.grab_noun(item_desc);

    let selected_noun_text = selected_noun.text;
    let noun_length = selected_noun_text.length;

    let blank_string_list = [];

    for (var i = 0; i < (noun_length); i ++) {

      if (i === 0) {
        blank_string_list.push(" ");
        continue;
      }

      blank_string_list.push("_");
    }

    console.log(blank_string_list);
    let blank_string = blank_string_list.join("");

    const new_desc = item_desc.replace(selected_noun_text, blank_string);

    return new_desc;
  }

}

export default QuizGen;
