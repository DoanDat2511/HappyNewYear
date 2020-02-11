/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import MakeItRain from './src/MakeItRain'
import {name as appName} from './app.json';
import FirstScreen from './src/FirstScreen'
import StackMain from './src/StackMain'

AppRegistry.registerComponent(appName, () => StackMain);
