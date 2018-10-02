/**
./Containers/HeaderBarContainer.js

Redux container for the HeaderBar component

**/

//react redux
import {connect} from 'react-redux';

//import component to connect
import HeaderBar from '../Components/HeaderBar';

//map redux state to component props
const mapStateToProps = (state) => ({
  score: state.score
})

//map redux dispatch actions to component props
const mapDispatchToProps = (dispatch) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBar);
