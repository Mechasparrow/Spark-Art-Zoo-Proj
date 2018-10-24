/**
  ./Containers/CollectionCardContainer.js

  Redux container for the Collection Card Component
**/

//react redux
import { connect } from "react-redux";

//component to bind
import CollectionGrid from "../Components/CollectionGrid";

//Redux actions
import { select_collection } from "../Actions";

//map redux state to component props
const mapStateToProps = state => ({
  completed_items: state.completed_items,
  selected_source_id: state.selected_source_id
});

//map redux dispatch actions to component props
const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionGrid);
