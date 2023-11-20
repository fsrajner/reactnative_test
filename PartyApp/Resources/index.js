import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import registerScreens from './src/Views';


var Parse = require('parse/react-native');
Parse.initialize("therestless");
Parse.serverURL = 'http://127.0.0.1:1337/parse'
// screen related book keeping
registerScreens();

Parse.User.currentAsync().then(
  (currentUser) => {
    if (currentUser) {
      Start();
    } else {
      Navigation.showModal({
        screen: 'PartyApp.Login.Login',
        title: 'Login',
      });
    }
  });
