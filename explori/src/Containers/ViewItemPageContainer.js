/**
./Containers/ViewItemPageContainer.js

redux container for the View Collection Page Component
**/

//react redux
import { connect } from "react-redux";

//grab the specific component to bind to
import ViewItemPage from "../Components/ViewItemPage";

//redux actions
import { select_item } from "../Actions";

//map redux state to component props
const mapStateToProps = state => ({
  collection_item_selected: state.selected_collection_idx !== null,
  selected_item_idx: state.selected_item_idx,
  selected_collection_idx: state.selected_collection_idx
});

//map redux dispatch action to components
const mapDispatchToProps = dispatch => ({
  select_item: item_idx => {
    dispatch(select_item(item_idx));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewItemPage);
