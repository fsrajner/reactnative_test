import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import TextProperty from '../../Controls/TextProperty';
import Start from '../../Start';

import styles from '../../Styles';
import strings from '../../Strings';

var Parse = require('parse/react-native');

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextProperty placeholder={strings.username}
          isSecure={false}
          onChangeTextValue={(username) => { this.setState({ username: username }) }} />
        <TextProperty placeholder={strings.password}
          isSecure={true}
          onChangeTextValue={(password) => { this.setState({ password: password }) }} />
        <Button title={strings.login} onPress={this.onLogin} />
        <Button title={strings.register} onPress={this.onRegister} />
      </View>
    )
  }

  onLogin = () => {
    Parse.User.logIn(this.state.username, this.state.password, {
      success: function (user) {
        if (user) {
          Start();
        }
      },
      error: function (user, error) {
        var message = JSON.stringify(error);
        Navigation.showLightBox({
          screen: "PartyApp.LightBox", // unique ID registered with Navigation.registerScreen
          passProps: {
            title: 'hiba',
            content: message
          },
          style: {
            backgroundBlur: "dark",
            backgroundColor: "#ff000080",
            tapBackgroundToDismiss: true
          }
        });
      }
    });
  }

  onRegister = () => {
    this.props.navigator.push({
      screen: 'PartyApp.Login.Register',
      title: 'Register',
    });
  }
};

export default Login;