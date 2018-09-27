//react redux
import {connect} from 'react-redux';

// grab the page to map the data to
import QuizPage from '../Components/QuizPage';

const mapStateToProps = (state) => ({
  collections: state.collections,
  selected_collection_idx: state.selected_collection_idx
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizPage);
