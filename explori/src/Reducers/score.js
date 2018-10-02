/**
./Reducers/score.js

score redux reducer that stores player score

**/

import {INCREMENT_SCORE} from '../Constants';

export const score = (state = 0, action) => {

  switch (action.type) {
    case INCREMENT_SCORE:
      return state + 1;
    default:
        return state;
  }

}
