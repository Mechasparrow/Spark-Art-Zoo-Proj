/**
./Containers/ItemCompletePageContainer.js

redux container for the Item Complete Page Component

**/

//react redux
import { connect } from "react-redux";

//Page to map data to
import ItemCompletedPage from "../Components/ItemCompletedPage";

//Redux actions
import { clear_item_selection } from "../Actions";

//map redux state to component props
const mapStateToProps = state => ({
  selected_item_idx: state.selected_item_idx,
  selected_collection_idx: state.selected_collection_idx,
  collection_item_selected:
    state.selected_collection_idx !== null && state.selected_item_idx !== null
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
)(ItemCompletedPage);
