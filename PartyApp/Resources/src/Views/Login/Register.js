import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Row from '../../Controls/Row';
import TextProperty from '../../Controls/TextProperty';
import Start from '../../Start';

import styles from '../../Styles';
import strings from '../../Strings';


var Parse = require('parse/react-native');


export default class Register extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <TextProperty placeholder={strings.email}
                    isSecure={false}
                    type='email-address'
                    onChangeTextValue={(email) => { this.setState({ email: email }) }} />
                <TextProperty placeholder={strings.username}
                    isSecure={false}
                    onChangeTextValue={(username) => { this.setState({ username: username }) }} />
                <TextProperty placeholder={strings.password}
                    isSecure={true}
                    onChangeTextValue={(password) => { this.setState({ password: password }) }} />
                <Button title={strings.register} onPress={this.onRegister} />
            </View>
        )
    }

    onRegister = () => {
        var user = new Parse.User();
        user.set("username", this.state.username);
        user.set("password", this.state.password);
        user.set("email", this.state.email);
        //user.set("phone", "415-392-0202");

        user.signUp(null, {
            success: function (user) {
                Start();
            },
            error: function (user, error) {
                Navigation.showLightBox({
                    screen: "PartyApp.LigthBox", // unique ID registered with Navigation.registerScreen
                    passProps: {
                        title: 'hiba',
                        content: error
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

}