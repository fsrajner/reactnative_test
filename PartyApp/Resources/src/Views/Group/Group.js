import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableHighlight, AlertIos, FlatList, Image } from 'react-native';

var Parse = require('parse/react-native');

import GroupModel from '../../Model/Group';
import PostModel from '../../Model/Post';
import PostRow from '../../Controls/PostRow';

class Group extends React.Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.groupId = this.props.id;

        this.state = {
            data: [],
            page: 0,
            pageSize: 5,
            loading: false
        }

    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'post') {
                this.props.navigator.push({
                    screen: 'PartyApp.Post.Post',
                    title: 'post',
                    passProps: {
                        id: this.groupId,
                        fromPage: "Group"
                    }
                });
            }
        }
    }

    render() {
        this.props.navigator.setButtons({
            rightButtons: [{
                title: 'Post',
                id: 'post'
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

    onRenderItem(item) {
        return (
            <PostRow data={item.item} />
        );
    }

    onLoadMore() {
        this.setState({
            page: this.state.page + 1,
        }, () => {
            this.makeRequest();
        })
    }

    parseGroup;

    makeRequest() {
        if (!this.parseGroup) {
            var groupQuery = new Parse.Query(GroupModel);
            groupQuery.include("posts");
            groupQuery.get(this.groupId, {
                success: (group) => {
                    this.parseGroup = group;
                    this.makeRequest();
                }, error: function (object, error) {
                    console.log("coulnd't find group ");
                    // The object was not retrieved successfully.
                    // error is a Parse.Error with an error code and message.
                }
            });
        } else {
            var posts = this.parseGroup.get('posts');
            var parsedResults = [];
            posts.forEach(function (post) {
                var author = post.get('author');
                var comments = post.get('comments');
                parsedResults.push({
                    text: post.get('text'),
                    author: {
                        id: author.id,
                        thumbnail: author.get('profile_picture')._url,
                        name: author.get('username')
                    },
                    location: {
                        name: "Majami",
                        id: "-1"
                    },
                    tags: post.get('tags'),
                    create_date: post.get('_created_at'),
                    update_date: post.get('_updated_at'),
                    up: post.get('up'),
                    down: post.get('down'),
                    attachments: post.get('attachments'),
                    thumbnail: post.get('thumbnail')._url,
                    hidden: post.get('hidden'),
                    key: post.id,
                    comments: {
                        count: 0,
                        comments: []
                    }
                });
            }, this);
            // Do something with the returned Parse.Object values
            this.setState({
                data: [...this.state.data, ...parsedResults],
                loading: false,
                refreshing: false

            });
        }
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

export default Group;