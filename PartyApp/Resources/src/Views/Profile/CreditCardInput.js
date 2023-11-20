import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

import styles from '../../Styles';
import strings from '../../Strings';

class CreditCard extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <CreditCardInput onChange={this.onChange} />
            </View>
        );
    }

    onChange = (form) => {
        console.log(form);
    }

}

export default CreditCard;