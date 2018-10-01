//react redux
import { connect } from "react-redux";

// grab the page to map the data to
import QuizPage from "../Components/QuizPage";

// quiz options gen
import { retrieve_potential_quiz_choices } from "../Data/loaded_data";

//redux actions
import {incrementScore} from '../Actions';

const mapStateToProps = state => ({
  collections: state.collections,
  quiz_options: state.quiz_options,
  selected_collection_idx: state.selected_collection_idx,
  selected_item_idx: state.selected_item_idx
});

const mapDispatchToProps = dispatch => ({
  incrementScore: () => {
    dispatch(incrementScore());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizPage);
