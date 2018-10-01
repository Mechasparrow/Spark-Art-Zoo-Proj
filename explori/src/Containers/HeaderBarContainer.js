import {connect} from 'react-redux';

//import component to connect
import HeaderBar from '../Components/HeaderBar';

const mapStateToProps = (state) => ({
  score: state.score
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBar);
