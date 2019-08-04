
import {
  createAppContainer,
  createStackNavigator,
} from 'react-navigation'

//import the screens 
import Login from './Screens/Login';
import TrainList from './Screens/TrainList';
import TrainPost from './Screens/TrainPost';
import Signup from './Screens/Signup'

const Nav = createStackNavigator({

  login: Login,
  signup: Signup,
  trainList: TrainList,
  trainPost: TrainPost,

},

  {
    initialRouteName: 'login',
  });


export default createAppContainer(Nav);

