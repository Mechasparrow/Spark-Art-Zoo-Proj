/**
./Reducers/quiz_options.js

redux reducer that stores the quiz_options

**/

import {
  loaded_collections,
  retrieve_potential_quiz_choices
} from "../Data/loaded_data";

// import redux action constants
import { LOAD_IN_CHOICES } from "../Constants";

export const quiz_options = (state = [], action) => {
  switch (action.type) {
    case LOAD_IN_CHOICES:
      let { loaded_choices } = action.payload;
      return loaded_choices;
    default:
      return state;
  }
};
