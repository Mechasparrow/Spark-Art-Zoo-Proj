/**

./Lib/Quiz.js

Base Quiz interface

**/

class Quiz {
  constructor(description, choices) {
    this.description = description;
    this.choices = choices;
  }

  //returns an empty quiz
  static empty() {
    return new Quiz("", []);
  }
}

export default Quiz;
