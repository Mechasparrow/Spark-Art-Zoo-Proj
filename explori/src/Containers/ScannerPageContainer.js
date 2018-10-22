/**
./Containers/ScannerPageContainer.js

redux container for the Scanner Page Component

**/

//react redux
import { connect } from "react-redux";

//Page to map data to
import ScannerPage from "../Components/ScannerPage";

//Redux actions
import { select_item_and_collection } from "../Actions";

//map redux state to component props
const mapStateToProps = state => ({});

//map redux dispatch actions to component props
const mapDispatchToProps = dispatch => ({
  selectItemAndCollection: (item_idx, callback) => {
    dispatch(select_item_and_collection(item_idx, callback));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScannerPage);
