//react redux
import { connect } from "react-redux";

// grab the page to map the data to
import ItemCard from "../Components/ItemCard";

//redux actions
import { select_item } from "../Actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  selectItem: idx => {
    dispatch(select_item(idx));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemCard);
