import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ChatScreen from './screens/Chat';
import JoinScreen from './screens/Join';
import FriendList from './screens/FriendList';

const AppStack = createStackNavigator({ Home: FriendList, Chat: ChatScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Join: JoinScreen
    },
    {
      initialRouteName: 'Join'
    }
  )
);
