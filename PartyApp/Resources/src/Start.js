import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import styles from './Styles';
import strings from './Strings';

Start = () => {
    tabs = [
        {
            label: strings.rooms,
            screen: 'PartyApp.Room.Rooms',
            icon: require('../img/list.png'),
            title: 'Room title',
        },
        {
            label: strings.groups,
            screen: 'PartyApp.Group.Groups',
            icon: require('../img/list.png'),
            title: 'Groups title',
        },
        {
            label: strings.profile,
            screen: 'PartyApp.Profile.Profile',
            icon: require('../img/list.png'),
            title: 'Profile title',
        },
        {
            label: 'Messages',
            screen: 'PartyApp.Chat.Conversations',
            icon: require('../img/list.png'),
            title: 'Messages',
        },
        {
            label: strings.swiper,
            screen: 'PartyApp.Game.Swiper',
            icon: require('../img/list.png'),
            title: 'Swiper title',
        },
        {
            label: 'QRScan',
            screen: 'PartyApp.Camera.QRScanner',
            icon: require('../img/list.png'),
            title: 'QRScan',
        },
        {
            label: 'QRCode',
            screen: 'PartyApp.Camera.QRCode',
            icon: require('../img/list.png'),
            title: 'QRCode',
        },
        {
            label: 'Test',
            screen: 'PartyApp.Test.Test',
            icon: require('../img/list.png'),
            title: 'Test',
        }
    ];

    Navigation.startTabBasedApp({
        tabs,
        animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
        tabsStyle: {
            tabBarBackgroundColor: '#003a66',
            navBarButtonColor: '#ffffff',
            tabBarButtonColor: '#ffffff',
            navBarTextColor: '#ffffff',
            tabBarSelectedButtonColor: '#ff505c',
            navigationBarColor: '#003a66',
            navBarBackgroundColor: '#003a66',
            statusBarColor: '#002b4c',
            tabFontFamily: 'BioRhyme-Bold',
        },
        appStyle: {
            tabBarBackgroundColor: '#003a66',
            navBarButtonColor: '#ffffff',
            tabBarButtonColor: '#ffffff',
            navBarTextColor: '#ffffff',
            tabBarSelectedButtonColor: '#ff505c',
            navigationBarColor: '#003a66',
            navBarBackgroundColor: '#003a66',
            statusBarColor: '#002b4c',
            tabFontFamily: 'BioRhyme-Bold',
        }
    });
}

export default Start;