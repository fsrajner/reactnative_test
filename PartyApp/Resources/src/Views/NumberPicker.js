import React from 'react';
import { StyleSheet, View, Text, Dimensions, Picker } from 'react-native';

class NumberPicker extends React.Component {
    constructor(props) {
        super(props);
        state = {
            value: "0"
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={"0"}
                    onValueChange={(itemValue, itemIndex) => this.setState({ value: itemValue })}>
                    <Picker.Item label="0" value="0" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                </Picker>
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
});

export default NumberPicker;
