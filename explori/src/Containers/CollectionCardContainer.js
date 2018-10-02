//react redux
import {connect} from 'react-redux';

//component to bind
import CollectionCard from '../Components/CollectionCard';

//Redux actions
import {select_collection} from '../Actions';

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  select_collection: (collection_idx) => {
    dispatch(select_collection(collection_idx));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionCard);
