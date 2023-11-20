import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableHighlight, SectionList, ListItem, Slider, FlatList } from 'react-native';
import Row from '../../Controls/Row';
import OrderModel from '../../Model/Order';
var Parse = require('parse/react-native');


class Order extends React.Component {
    dataSource = {}

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.roomId = this.props.id;
        this.state = {
            order: []
        }
        this.dataSource = [
            { data: [{ id: 1 }, { title: 'sor1' }], key: 'sor' },
            { data: [{ id: 2 }, { title: 'sor2' }], key: 'sor' },
            { data: [{ id: 3 }, { title: 'bor1' }], key: 'bor' },
        ]
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'finish') { // this is the same id field from the static navigatorButtons definition
                var order = OrderModel.create(this.state.items);
                order.save();
                console.log('elmentve');
            }
        }
    }

    addItem(item) {
        var items = this.state.items;
        var isInserted = false;

        for (let i = 0; i < items.length; i++) {
            if (items[i].item == item) {
                items[i].quantity++;
                isInserted = true;
                break;
            }
        }

        if (!isInserted)
            items.push({
                item: item,
                quantity: 1
            });
        this.setState({ item: items });
    }

    removeItem(item) {
        var items = this.state.items;
        var isRemoved = false;
        for (let i = 0; i < items.length; i++) {
            if (items[i].item == item) {
                if (items[i].quantity == 1)
                    items = items.splice(items.find((indx, x) => {
                        return x.item == item;
                    }), 1);
                else
                    items[i].quantity--;
                isRemoved = true;
                break;
            }
        }
        this.setState({ item: items });
    }

    renderItem = (item) => {
        return <Row title={item.item.title} onPress={this.addItem} onLongPress={this.removeItem} />;
    }

    renderSectionHeader = (headerItem) => {
        return <Text style={styles.text}>{headerItem.section.key}</Text>;
    }

    render() {
        this.props.navigator.setButtons({
            rightButtons: [{
                title: 'finish',
                id: 'finish',
            }],
            animated: true,
        });

        return (
            <ScrollView style={styles.container}>
                <FlatList horizontal={true}
                    renderItem={this.renderItem}
                    renderSectionHeader={this.renderSectionHeader}
                    sections={this.dataSource}
                    keyExtractor={(item) => item.title}
                />
            </ScrollView>
        );
    }

    Lists() {
        return this.state.lists.map((list) => {
            return (
                <View style={styles.container} >
                    <Text style={styles.title} >{list.title}</Text>
                    <FlatList horizontal={true}>
                    </FlatList>
                </View >
            )
        })
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

export default Order;