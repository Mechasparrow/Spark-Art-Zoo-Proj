/**
./Containers/ItemUncompletePageContainer.js

redux container for the Item Incorrect Page Component

**/

//react redux
import { connect } from "react-redux";

//Page to map data to
import ItemUncompletedPage from "../Components/ItemIncorrectPage";

//Redux actions
import {clear_item_selection } from "../Actions";

//map redux state to component props
const mapStateToProps = state => ({
  collections: state.collections,
  selected_item_idx: state.selected_item_idx,
  selected_collection_idx: state.selected_collection_idx,
  collection_item_selected: (state.selected_collection_idx !== null && state.selected_item_idx !== null)
});

//map redux dispatch actions to component props
const mapDispatchToProps = dispatch => ({
  clearItemSelection: () => {
    dispatch(clear_item_selection());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemUncompletedPage);
