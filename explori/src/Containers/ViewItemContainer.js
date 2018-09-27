import {connect} from 'react-redux';

//grab the specific component to bind to
import ViewItemPage from '../Components/ViewItemPage';

const mapStateToProps = (state) => ({
  selected_collection_idx: state.selected_collection_idx,
  collections: state.collections
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewItemPage);
