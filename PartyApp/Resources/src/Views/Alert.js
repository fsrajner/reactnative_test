import React from 'react';
import { StyleSheet, View, Text, Dimensions, Button } from 'react-native';

import styles from '../Styles';
import strings from '../Strings';

class Notification extends React.Component {
  title = 'Notification';
  content = "You have 10 unread notifications!";

  constructor(props) {
    super(props);
    if (props.content)
      this.content = props.content;
    if (props.title)
      this.title = props.title;
  }

  render() {
    return (
      <View style={styles.alertContainer}>
        <Text style={styles.title}>{this.title}</Text>
        <Text style={styles.content}>{this.content}</Text>
      </View>
    );
  }
}

export default Notification;
