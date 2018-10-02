/**
./Reducers/quiz_options.js

redux reducer that stores the quiz_options

**/

import {
  loaded_collections,
  retrieve_potential_quiz_choices
} from "../Data/loaded_data";

export const quiz_options = (
  state = retrieve_potential_quiz_choices(loaded_collections, 200),
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};
