import { connect } from "react-redux";

//Page to map data to
import HomePage from "../Components/HomePage";

//Redux actions
import { select_collection, clear_item_selection } from "../Actions";

const mapStateToProps = state => ({
  collections: state.collections
});

const mapDispatchToProps = dispatch => ({
  clearItemSelection: () => {
    dispatch(clear_item_selection());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
