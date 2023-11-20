import React from 'react';
import { StyleSheet, View, Text, ScrollView, Button, Image, Slider } from 'react-native';
import { Navigation } from 'react-native-navigation';
import CreditCard from './CreditCardInput';
import TextProperty from '../../Controls/TextProperty';

import styles from '../../Styles';
import strings from '../../Strings';

var Parse = require('parse/react-native');

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onLoad() {
        var currentUser = Parse.User.current();
        this.setState({ username: currentUser.getUsername() });
        this.setState({ email: currentUser.getEmail() });
        this.setState({ token: currentUser.getSessionToken() });
        this.setState({ profile_picture: currentUser.get('profile_picture')._url });
    }

    componentDidMount() {
        this.onLoad();
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{ uri: this.state.profile_picture }} style={{ width: 350, height: 350 }} />
                <Text>Partiertek:
                    </Text>
                <Slider
                    style={{ width: 300 }}
                    step={1}
                    minimumValue={0}
                    maximumValue={10}
                    value={this.state.slut_o_meter}
                    onValueChange={val => this.setState({ slut_o_meter: val })}
                />
                <TextProperty style={styles.title} placeholder={strings.username} value={this.state.username} />
                <TextProperty style={styles.title} placeholder={strings.email} value={this.state.email} />
                <Button style={styles.container} title={strings.logout} onPress={this.onLogout} />
            </View>
        );
    }

    onLogout = (form) => {
        Parse.User.logOut().then(() => {
            Navigation.showModal({
                screen: 'PartyApp.Login.Login',
                title: 'Login',
            });
        });

    }

}

export default Profile;