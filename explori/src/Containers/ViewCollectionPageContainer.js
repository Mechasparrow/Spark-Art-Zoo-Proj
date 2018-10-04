/**
./Containers/ViewCollectionPage.js

redux container for the View Collection Page Component

**/

//react redux
import {connect} from 'react-redux';

//util lib
import _ from 'lodash';

//import component to inject redux store
import ViewCollectionPage from '../Components/ViewCollectionPage';

//function that counts all the items that have been collected
const itemsCollected = (state) => {
  let {collections, selected_collection_idx} = state;

  if (selected_collection_idx !== null) {

    let selected_collection = collections[selected_collection_idx];
    let collection_items = selected_collection.items;

    let completed_items = _.filter(collection_items, function (item) {
      return (item.completed === true);
    })

    return completed_items.length;

  }else {
    return null;
  }

}

//function that returns the length of all the items in the collection
const collection_length = (state) => {

  let {collections, selected_collection_idx} = state;

  if (selected_collection_idx !== null) {

    let selected_collection = collections[selected_collection_idx];
    let collection_items = selected_collection.items;

    return collection_items.length;

  }else {
    return null;
  }
}

//map redux state to component props
const mapStateToProps = (state) => ({
  collections: state.collections,
  collection_selected: (state.selected_collection_idx !== null),
  selected_collection_idx: state.selected_collection_idx,
  items_completed: itemsCollected(state),
  collection_size: collection_length(state)
});

//map redux dispatch action to components
const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCollectionPage);
