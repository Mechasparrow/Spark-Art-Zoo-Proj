import { connect } from "react-redux";

//grab the specific component to bind to
import ViewItemPage from "../Components/ViewItemPage";

//redux actions
import { select_item } from "../Actions";

const mapStateToProps = state => ({
  selected_item_idx: state.selected_item_idx,
  selected_collection_idx: state.selected_collection_idx,
  collections: state.collections
});

const mapDispatchToProps = dispatch => ({
  select_item: item_idx => {
    dispatch(select_item(item_idx));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewItemPage);
