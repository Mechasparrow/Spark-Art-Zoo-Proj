/**
./Reducers/selected_source_id

returns the selected source id via redux reducer


**/

//import redux constants
import {SELECT_SOURCE} from '../Constants';

export const selected_source_id = (state = null, action) => {

  switch (action.type) {

    case SELECT_SOURCE:
      let selected_source = action.payload.selected_source_id;
      return selected_source
    default:
      return state

  }


}
