import {connect} from 'react-redux';

//Page to map data to
import HomePage from '../Components/HomePage';

//Redux actions
import {select_collection} from '../Actions';

const mapStateToProps = (state) => ({
  collections: state.collections
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
