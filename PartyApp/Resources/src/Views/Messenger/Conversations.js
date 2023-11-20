import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableHighlight, FlatList, Image } from 'react-native';
//import RoomRow from '../../Views/Room/RoomRow';
import Row from '../../Controls/Row';
//import styles from '../../Styles';
import strings from '../../Strings';

var Parse = require('parse/react-native');
import ConversationModel from '../../Model/Conversation';

class Conversations extends React.Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.state = {
            data: [],
            page: 0,
            pageSize: 5,
            loading: false
        }
        this._isMounted = false;
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == '+') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.push({
                    screen: 'PartyApp.Profile.Profiles',
                    title: strings.search_profile,
                });
            }
        }
    }

    componentWillMount() {
        this._isMounted = true;
        this.makeRequest();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        this.props.navigator.setButtons({
            rightButtons: [{
                title: '+',
                id: '+',
            }],
            animated: true,
        });

        return (
            <ScrollView style={styles.container}>
                <FlatList data={this.state.data}
                    renderItem={this.onRenderItem}
                    keyExtractor={item => item.key}
                    onEndReached={() => {
                        this.setState({
                            page: this.state.page + 1,
                        }, () => {
                            this.makeRequest();
                        })
                    }}
                    onEndThreshol={3}
                />
            </ScrollView>
        );
    }


    onRenderItem = (e) => {
        return (
            <View>
                <Image
                    source={{ uri: e.item.thumbnail }}
                    style={{ borderRadius: 20, width: 40, height: 40, marginHorizontal: 3, marginVertical: 3 }} />
                <Row title={e.item.title} onPress={() => {
                    let id = e.item.id;
                    this.props.navigator.push({
                        screen: 'PartyApp.Chat.Conversation',
                        title: e.item.title,
                        passProps: {
                            id: id
                        }
                    });
                }} />
            </View>
        )
    }

    onLoadMore() {

        this.setState({
            page: this.state.page + 1,
        }, () => {
            this.makeRequest();
        })
    }

    makeRequest() {
        var currentUser = Parse.User.current();
        var _ths = this;
        var page = this.state.page;
        var pageSize = this.state.pageSize;
        var query = new Parse.Query(ConversationModel);
        query.skip(page * pageSize);
        query.limit(pageSize);
        query.containedIn("subscribed_users", [currentUser]);
        query.notContainedIn('banned_users', [currentUser]);
        query.descending("last_message_date");
        query.find({
            success: function (results) {
                var parsedResults = [];
                results.forEach(function (element) {
                    var thumbnail = element.get('thumbnail');
                    parsedResults.push({
                        thumbnail: thumbnail ? thumbnail._url : "http://images5.fanpop.com/image/photos/26400000/oh-selena-i-found-this-on-ym-frined-name-anglebell619-and-selena_mgrocks-26476250-175-222.jpg",
                        title: element.get('title'),
                        id: element.id,
                        key: element.id,
                    })
                }, this);
                // Do something with the returned Parse.Object values
                _ths.setState({
                    data: [..._ths.state.data, ...parsedResults],
                    loading: false,
                    refreshing: false
                });
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        height: 48,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        fontSize: 16,
    },
});

export default Conversations;