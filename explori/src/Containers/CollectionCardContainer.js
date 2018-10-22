/**
  ./Containers/CollectionCardContainer.js

  Redux container for the Collection Card Component
**/

//react redux
import { connect } from "react-redux";

//component to bind
import CollectionCard from "../Components/CollectionCard";

//Redux actions
import { select_collection } from "../Actions";

//map redux state to component props
const mapStateToProps = state => ({
  completed_items: state.completed_items
});

//map redux dispatch actions to component props
const mapDispatchToProps = dispatch => ({
  select_collection: collection_idx => {
    dispatch(select_collection(collection_idx));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionCard);
