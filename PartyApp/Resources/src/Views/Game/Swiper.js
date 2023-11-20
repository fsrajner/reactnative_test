import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Row from '../../Controls/Row';
import SwipeCards from 'react-native-swipe-cards';

function Card(x) {
    return (
        <View style={styles.card} key={x.id}>
            <Image source={x.image} resizeMode="contain" style={{ width: 350, height: 350 }} />
            <View style={{ width: 350, height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', margin: 15, marginTop: 25, }} >
                    <Text style={{ fontSize: 20, fontWeight: '300', color: '#444' }}>{x.first_name}, </Text>
                    <Text style={{ fontSize: 21, fontWeight: '200', color: '#444' }}>{x.age}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ padding: 13, borderLeftWidth: 1, borderColor: '#e3e3e3', alignItems: 'center', justifyContent: 'space-between' }}><Image name='people-outline' size={20} color="#777" style={{}} /><Text style={{ fontSize: 16, fontWeight: '200', color: '#555' }}>{x.friends}</Text></View>
                    <View style={{ padding: 13, borderLeftWidth: 1, borderColor: '#e3e3e3', alignItems: 'center', justifyContent: 'space-between' }}><Image name='import-contacts' size={20} color="#777" /><Text style={{ fontSize: 16, fontWeight: '200', color: '#555' }}>{x.interests}</Text></View>
                </View>
            </View>
        </View>
    )
}

NoMoreCards = React.createClass({
    render() {
        return (
            <View>
                <Text style={styles.noMoreCardsText}>No more cards</Text>
            </View>
        )
    }
})

class Swiper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: Cards
        }
    }

    handleYup(card) {
        console.log(`Yup for ${card.text}`)
    }
    handleNope(card) {
        console.log(`Nope for ${card.text}`)
    }
    handleMaybe(card) {
        console.log(`Maybe for ${card.text}`)
    }
    render() {
        return (
            <SwipeCards
                cards={Cards}
                stack={true}
                renderCard={(cardData) => Card(cardData)}
                renderNoMoreCards={() => <NoMoreCards />}
                cardKey={"id"}
                handleYup={this.handleYup}
                handleNope={this.handleNope}
                handleMaybe={this.handleMaybe}
                hasMaybeAction
            />
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#f7f7f7',
    },
    buttons: {
        width: 80,
        height: 80,
        borderWidth: 10,
        borderColor: '#e7e7e7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40
    },
    buttonSmall: {
        width: 50,
        height: 50,
        borderWidth: 10,
        borderColor: '#e7e7e7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    card: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#e3e3e3',
        width: 350,
        height: 420,
    }
});

var image1 = require('../../images/image1.jpeg')
var image2 = require('../../images/image2.jpeg')
var image3 = require('../../images/image3.jpeg')
var image4 = require('../../images/image4.jpeg')
var image5 = require('../../images/image5.jpeg')
var image6 = require('../../images/image6.jpeg')

const Cards = [{
    "id": 1,
    "first_name": "Denise",
    "age": 21,
    "friends": 9,
    "interests": 38,
    "image": image1
}, {
    "id": 2,
    "first_name": "Cynthia",
    "age": 27,
    "friends": 16,
    "interests": 49,
    "image": image2
}, {
    "id": 3,
    "first_name": "Maria",
    "age": 29,
    "friends": 2,
    "interests": 39,
    "image": image3
}, {
    "id": 4,
    "first_name": "Jessica",
    "age": 20,
    "friends": 18,
    "interests": 50,
    "image": image4
}, {
    "id": 5,
    "first_name": "Julie",
    "age": 28,
    "friends": 2,
    "interests": 13,
    "image": image5
}, {
    "id": 6,
    "first_name": "Anna",
    "age": 24,
    "friends": 12,
    "interests": 44,
    "image": image6
}]

export default Swiper;