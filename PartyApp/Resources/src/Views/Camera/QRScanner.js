'use strict';

import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

class QRScanner extends React.Component {

    onSuccess = (e) => {
        Linking.openURL(e.data).catch(err => console.error('An error occured', err));
    }

    render() {
        return (
            <View style={styles.container}>
                <QRCodeScanner onRead={this.onSuccess}
                    topContent={
                        <Text style={styles.centerText}>
                            Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
                        </Text>
                    }
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text style={styles.buttonText}>OK. Got it!</Text>
                        </TouchableOpacity>
                    }
                >
                </QRCodeScanner>
            </View>
        );
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

export default QRScanner;