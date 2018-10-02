/**
./Containers/ViewCollectionPage.js

redux container for the View Collection Page Component

**/

//react redux
import {connect} from 'react-redux';

//import component to inject redux store
import ViewCollectionPage from '../Components/ViewCollectionPage';

//map redux state to component props
const mapStateToProps = (state) => ({
  collections: state.collections,
  selected_collection_idx: state.selected_collection_idx
});

//map redux dispatch action to components
const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCollectionPage);
