'use strict';

import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, Button } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import User from '../../src/Model/User';
import Merchandise from '../../src/Model/Merchandise';
import Menu from '../../src/Model/Menu';
import Post from '../../src/Model/Post';
import Room from '../../src/Model/Room';
import Order from '../../src/Model/Order';
import Group from '../../src/Model/Group';
import Comment from '../../src/Model/Comment';

import RNFetchBlob from 'react-native-fetch-blob'

var Parse = require('parse/react-native');

var adambrauImage;// = require('../../src/images/ActiOn_3.jpg');
var aranyImage;// = require('../../src/images/ActiOn_1.jpg');
var zsDeszkaImage;// = require('../../src/images/slide6.jpg');
var sorkertImage;// = require('../../src/images/sorkert.jpg');

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        RNFetchBlob.fetch('GET', 'http://www.lacsiboltja.hu/storage_db/image/24963_maranyaszok.jpg', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        })
            .then((res) => {
                // the conversion is done in native code
                aranyImage = res.base64()
            }).catch((errorMessage, statusCode) => {
                // error handling
                console.log(errorMessage);
            });
        RNFetchBlob.fetch('GET', 'http://www.beerlabels.es/label/big_20413_escanear0011-jpg.jpg')
            .then((res) => {
                // the conversion is done in native code
                adambrauImage = res.base64()
            });
        RNFetchBlob.fetch('GET', 'http://zsirosdeszka.hu/images/slide6.jpg')
            .then((res) => {
                // the conversion is done in native code
                zsDeszkaImage = res.base64()
            });
        RNFetchBlob.fetch('GET', 'http://www.sorkert.hu/images/slideshow/sorkert.jpg')
            .then((res) => {
                // the conversion is done in native code
                sorkertImage = res.base64()
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <Button title="run" onPress={this.onTest} />
            </View>
        );
    }

    onTest = () => {
        var currentUser = Parse.User.current();
        var user = User.create(currentUser)
        user.save().then(() => {

            var aranyDBImage = new Parse.File("arany.jpg", { base64: aranyImage });
            aranyDBImage.save().then(() => {
                var aranyMerch = Merchandise.create(aranyDBImage, "Arany Ászok", "beer", "jó sör");
                aranyMerch.save().then(() => {

                    var adambrauDBImage = new Parse.File("adambrau.jpg", { base64: adambrauImage });
                    adambrauDBImage.save().then(() => {
                        var adambMerch = Merchandise.create(adambrauDBImage, "Adambrau", "beer", "schön beer");
                        adambMerch.save().then(() => {

                            var zsDeskaDBImage = new Parse.File("zsiros_deszka.jpg", { base64: zsDeszkaImage });
                            zsDeskaDBImage.save().then(() => {
                                var zsDeszkaMerch = Merchandise.create(aranyDBImage, "zsíros deszka", "food", "extra szírral");
                                zsDeszkaMerch.save().then(() => {
                                    var menu = Menu.create([{
                                        "item": aranyMerch,
                                        "available": 300,
                                        "price": 600,
                                        "currency": "huf",
                                        "priority": 0
                                    }, {
                                        "item": adambMerch,
                                        "available": 350,
                                        "price": 400,
                                        "currency": "huf",
                                        "priority": 0
                                    }, {
                                        "item": zsDeszkaMerch,
                                        "available": 9999,
                                        "price": 150,
                                        "currency": "huf",
                                        "priority": 0
                                    }]);
                                    menu.save().then(() => {
                                        var sorkertDBImage = new Parse.File("sorkert.jpg", { base64: sorkertImage });
                                        sorkertDBImage.save().then(() => {
                                            var roomPost = Post.create(currentUser, "smack my bitch up", sorkertDBImage);
                                            var roomComment = Comment.create(currentUser, "DRINK U FUK");
                                            roomComment.save().then(() => {
                                                roomPost.addUnique("comments", roomComment);
                                                roomPost.addUnique("tags", "#YOLO");
                                                roomPost.addUnique("attachments", zsDeskaDBImage);
                                                roomPost.addUnique("attachments", aranyDBImage);
                                                roomPost.save().then(() => {
                                                    var room = Room.create(currentUser, "Sörkert", sorkertDBImage);
                                                    room.addUnique("posts", roomPost);
                                                    room.save().then(() => {

                                                        var groupPost = Post.create(currentUser, "This is my very first post, it's unbelievable", sorkertDBImage);
                                                        var groupComment = Comment.create(currentUser, "Love me please");
                                                        groupComment.save().then(() => {
                                                            groupPost.addUnique("comments", groupComment);
                                                            groupPost.addUnique("tags", "#YOLO");
                                                            groupPost.addUnique("attachments", zsDeskaDBImage);
                                                            groupPost.addUnique("attachments", aranyDBImage);
                                                            groupPost.save().then(() => {
                                                                var group = Group.create(currentUser, "vitorlazok");
                                                                group.addUnique("posts", groupPost);
                                                                group.save().then(() => {
                                                                    var order = Order.create(room, [{
                                                                        "item": aranyMerch,
                                                                        "quantity": 2
                                                                    }, {
                                                                        "item": zsDeszkaMerch,
                                                                        "quantity": 1
                                                                    }
                                                                    ], 1350, 100, "serve with roses for the ladies", currentUser);
                                                                    order.save().then(() => {
                                                                        currentUser.set('profile_picture', zsDeskaDBImage);
                                                                        currentUser.set("subscribed_rooms", [room]);
                                                                        currentUser.set("subscribed_groups", [group]);
                                                                        var otherUserQuery = new Parse.Query(Parse.User);
                                                                        // Dsa id: V9rgXapi9Z
                                                                        // Asd id: cAp6nCSXdu
                                                                        otherUserQuery.get("cAp6nCSXdu", {
                                                                            success: (otherUser) => {
                                                                                currentUser.set("friends", [otherUser]);
                                                                                currentUser.save().then(() => {
                                                                                    console.log("insert test data ready");
                                                                                });
                                                                            }, error: (object, error) => {
                                                                                console.log(error);
                                                                            }
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });


    }



}

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: '#ff505c',
        padding: 16,
        margin: 10,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
    },
    content: {
        textAlign: 'center',
        marginTop: 10,
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },

    textBold: {
        fontWeight: '500',
        color: '#000',
    },

    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },

    buttonTouchable: {
        padding: 16,
    },
});

export default Test;