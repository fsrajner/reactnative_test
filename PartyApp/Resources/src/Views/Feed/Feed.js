import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableHighlight, FlatList, Image } from 'react-native';
//import RoomRow from '../../Views/Room/RoomRow';
import Row from '../../Controls/Row';
//import styles from '../../Styles';
import strings from '../../Strings';

var Parse = require('parse/react-native');
import PostModel from '../../Model/Post';

class Feed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 0,
            pageSize: 5,
            loading: false
        }
        this._isMounted = false;
    }

    componentWillMount() {
        this._isMounted = true;
        this.makeRequest();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
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
                        screen: 'PartyApp.Room.Room',
                        title: 'title',
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
        var page = this.state.page;
        var pageSize = this.state.pageSize;
        var query = new Parse.Query(PostModel);
        var _ths = this;
        query.skip(page * pageSize);
        query.limit(pageSize);
        query.containedIn("subscribed_users", [currentUser]);
        //query.notContainedIn('banned_users', currentUser);
        query.ascending("priority", "title");
        query.find({
            success: function (results) {
                var parsedResults = [];
                results.forEach(function (element) {
                    parsedResults.push({
                        thumbnail: element.get('thumbnail')._url,
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

export default Feed;