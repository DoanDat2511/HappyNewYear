import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import FirstScreen from './FirstScreen'
import MakeltRain from './MakeItRain'
import SeconScreen from './SeconScreen'
// import FireworkShooter from './FireworkShooter'

const MainNavigator = createStackNavigator({
    FirstScreen: {
        screen: FirstScreen,
        navigationOptions: {
            headerShown: false
        }
    },
 
    MakeltRain: {
        screen: MakeltRain,
        navigationOptions: {
            headerShown: false
        }
    },
    SeconScreen: {
        screen: SeconScreen,
        navigationOptions: {
            headerShown: false
        }
    },
  

},
    {
        initialRouteName: 'FirstScreen'
    });
  

const StackMain = createAppContainer(MainNavigator);

export default StackMain;