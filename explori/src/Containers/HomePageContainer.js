/**
./Containers/HomePageContainer.js

redux container for the Home Page Component

**/

//react redux
import { connect } from "react-redux";

//Page to map data to
import HomePage from "../Components/HomePage";

//Redux actions
import {
  select_collection,
  clear_item_selection,
  clear_collection_selection,
  grabStartingSource, selectSource
} from "../Actions";


//map redux state to component props
const mapStateToProps = state => ({
  selected_source_id: state.selected_source_id
});

//map redux dispatch actions to component props
const mapDispatchToProps = dispatch => ({
  clearItemSelection: () => {
    dispatch(clear_item_selection());
  },
  clearCollectionSelection: () => {
    dispatch(clear_collection_selection());
  },
  selectSource: (source_id) => {
    dispatch(selectSource(source_id));
  },
  grabStartingSource: () => {
    dispatch(grabStartingSource());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
