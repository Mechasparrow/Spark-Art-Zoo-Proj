import {connect} from 'react-redux';

//import component to inject redux store
import ViewCollectionPage from '../Components/ViewCollectionPage';

const mapStateToProps = (state) => ({
  collections: state.collections,
  selected_collection_idx: state.selected_collection_idx
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCollectionPage);
