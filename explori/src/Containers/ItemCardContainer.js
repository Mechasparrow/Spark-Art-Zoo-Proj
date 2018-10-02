/**
./Containers/ItemCardContainer.js

redux container for the Item Card Component

**/

//react redux
import { connect } from "react-redux";

// grab the page to map the data to
import ItemCard from "../Components/ItemCard";

//redux actions
import { select_item } from "../Actions";

//map redux state to component props
const mapStateToProps = state => ({});

//map redux dispatch actions to component props
const mapDispatchToProps = dispatch => ({
  selectItem: idx => {
    dispatch(select_item(idx));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemCard);
