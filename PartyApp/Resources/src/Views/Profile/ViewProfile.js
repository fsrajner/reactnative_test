import React from 'react';
import { StyleSheet, View, Text, ScrollView, Button, Image, Slider } from 'react-native';
import { Navigation } from 'react-native-navigation';
import CreditCard from './CreditCardInput';
import TextProperty from '../../Controls/TextProperty';

import styles from '../../Styles';
import strings from '../../Strings';

var Parse = require('parse/react-native');
import ConversationModel from '../../Model/Conversation';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.profileId = this.props.id;
        this.state = {
        };
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'message') { // this is the same id field from the static navigatorButtons definition
                this.getConversation().then(conversation => {
                    this.props.navigator.push({
                        screen: 'PartyApp.Chat.Conversation',
                        title: this.state.username,
                        passProps: {
                            conversationId: conversation ? conversation.id : null,
                            newConversation: conversation ? true : false,
                            conversationParticipants: [this.user, Parse.User.current()]
                        }
                    });
                })


            }
        }
    }

    getUser() {
        let _ths = this;
        return new Promise((resolve, reject) => {
            if (!_ths.user) {
                var query = new Parse.Query(Parse.User);
                return query.get(_ths.profileId).then((user) => {
                    _ths.user = user;
                    resolve(user);
                });
            }
            else
                resolve(_ths.user);
        });
    }

    getConversation() {
        let _ths = this;
        return new Promise((resolve, reject) => {
            return _ths.getUser().then(user => {
                var query = new Parse.Query(ConversationModel);
                query.containedIn('subscribed_users', [user, Parse.User.current()]);
                return query.find().then((conversation) => {
                    resolve(conversation);
                }).catch(error => {
                    resolve(null);
                });
            })
        });
    }

    componentDidMount() {
        this.props.navigator.setButtons({
            rightButtons: [{
                title: 'message',
                id: 'message',
            }],
            animated: true,
        });

        this.getUser()
            .then(user => {
                this.setState({ username: user.getUsername() });
                this.setState({ email: user.getEmail() });
                this.setState({ token: user.getSessionToken() });
                this.setState({ profile_picture: user.get('profile_picture')._url });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={this.state.profile_picture} style={{ width: 350, height: 350 }} />
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