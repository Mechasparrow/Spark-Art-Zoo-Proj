/**
./Containers/HeaderBarContainer.js

Redux container for the HeaderBar component

**/

//react redux
import { connect } from "react-redux";

//import component to connect
import HeaderBar from "../Components/HeaderBar";

//import redux actio
import { select_random_item } from "../Actions";

//map redux state to component props
const mapStateToProps = state => ({
  score: state.score,
  selected_source_id: state.selected_source_id
});

//map redux dispatch actions to component props
const mapDispatchToProps = dispatch => ({
  selectRandomItem: (source_id, callback = () => {}) => {
    dispatch(select_random_item(source_id, callback));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBar);
