/**
./Actions/index.js
a.k.a ./Actions

root script that defines the possible redux actions that are available

**/

//get api
import ApiInterface from "../Lib/ApiInterface";

//util lib
import _ from 'lodash';

//import data load via api for extra api features
import { generate_potential_quiz_options } from "../Data/loaded_api_data";

//Import all the necessary redux constants
import {
  TEST,
  SELECT_COLLECTION,
  SELECT_ITEM,
  CLEAR_ITEM_SELECTION,
  CLEAR_COLLECTION_SELECTION,
  INCREMENT_SCORE,
  COMPLETE_ITEM,
  LOAD_IN_CHOICES,
  SELECT_SOURCE
} from "../Constants";

//test action for DEBUG
export const test = () => ({
  type: TEST
});

//actions for selection

export const select_collection = collection_idx => ({
  type: SELECT_COLLECTION,
  payload: {
    collection_idx
  }
});

export const select_item = selected_item_idx => ({
  type: SELECT_ITEM,
  payload: {
    selected_item_idx
  }
});

export const select_item_and_collection_and_source = (item_idx, callback) => {
  return (dispatch, getState) => {
    ApiInterface.getItem(item_idx)
      .then(function(item) {
        let coll_id = item.collection;
        dispatch(select_item(item_idx));
        dispatch(select_collection(coll_id));
        return ApiInterface.getCollection(coll_id);
      }).then (function (collection) {
        dispatch(selectSource(collection.source));
      })
      .then(function() {
        callback();
      });
  };
};

// complete item
export const complete_item = item_idx => ({
  type: COMPLETE_ITEM,
  payload: {
    completed_item_idx: item_idx
  }
});

//actions to clear selections

export const clear_item_selection = () => ({
  type: CLEAR_ITEM_SELECTION
});

export const clear_collection_selection = () => ({
  type: CLEAR_COLLECTION_SELECTION
});

//score actions
export const incrementScore = () => ({
  type: INCREMENT_SCORE
});

//load in choices
export const loadInChoices = loaded_choices => ({
  type: LOAD_IN_CHOICES,
  payload: {
    loaded_choices
  }
});

//source selection
export const selectSource = (selected_source_id) => ({
  type: SELECT_SOURCE,
  payload: {
    selected_source_id
  }
})

export const grabStartingSource = () => {

  return (dispatch, getState) => {
      ApiInterface.getSources().then (function (sources) {
        var rando_source = _.sample(sources);
        dispatch(selectSource(rando_source.id));
      })
  }

}

//async load in choices redux actions via api
export const loadInFauxChoicesViaApi = (size = null) => {
  return (dispatch, getState) => {
    generate_potential_quiz_options(size)
      .then(generated_quiz_choices => {
        dispatch(loadInChoices(generated_quiz_choices));
      })
      .catch(err => {
        console.log(err);
        dispatch(loadInChoices([]));
      });
  };
};
