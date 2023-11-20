import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableHighlight, FlatList, Image } from 'react-native';
import Row from '../../Controls/Row';
import styles from '../../Styles';
import strings from '../../Strings';

var Parse = require('parse/react-native');
import RoomModel from '../../Model/Room';
import SearchBar from 'react-native-searchbar'

class Profiles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 0,
            pageSize: 5,
            loading: false,
            searchString: ""
        }
        this._isMounted = false;
    }

    componentWillMount() {
        this._isMounted = true;
        //this.makeRequest();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    searchBar;

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    handleSearch={(value) => {
                        this.setState({ searchString: value });
                    }}
                    onSubmitEditing={() => {
                        var value = this.searchBar.getValue();
                        this.setState({ searchString: value });
                        this.makeRequest();
                    }}
                    showOnLoad
                />
                <ScrollView style={styles.scrollContainer}>
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
            </View >
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
                        screen: 'PartyApp.Profile.ViewProfile',
                        title: e.title,
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
        let _ths = this;
        var currentUser = Parse.User.current();
        var page = this.state.page;
        var pageSize = this.state.pageSize;
        var friendQuery = new Parse.Query(Parse.User);
        //friendQuery.containedIn(currentUser.get('friends'));

        var visibleQuery = new Parse.Query(Parse.User);
        visibleQuery.greaterThan('visibility', 2);
        var query = Parse.Query.or(friendQuery, visibleQuery);
        query.skip(page * pageSize);
        query.limit(pageSize);
        query.startsWith("username", this.state.searchString);
        query.ascending("username");
        query.find().then(results => {
            var parsedResults = [];
            results.forEach(function (element) {
                var thumbnail = element.get('profile_picture');
                parsedResults.push({
                    thumbnail: thumbnail ? thumbnail._url : null,
                    title: element.getUsername(),
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
        }, error => {
            alert("Error: " + error.code + " " + error.message);
        });
    }

}


export default Profiles;