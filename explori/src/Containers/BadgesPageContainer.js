/**
  ./Containers/BadgesPageContainer.js

  Redux container for the Badge Page
**/

//react redux
import { connect } from "react-redux";

//component to bind
import BadgesPage from "../Components/BadgePage";

//map redux state to component props
const mapStateToProps = state => ({
  completed_items: state.completed_items,
  valid: state.selected_source_id !== null
});

//map redux dispatch actions to component props
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BadgesPage);
