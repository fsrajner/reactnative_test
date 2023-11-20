import React from 'react';
import { View, Text} from 'react-native';

import styles from '../Styles';
import strings from '../Strings';

class LightBox extends React.Component {
    
    // render() {
    //     return (
    //         <View style={styles.lightBoxContainer}>
    //             <Text style={styles.title}>{this.props.title}</Text>
    //             <Text style={styles.content}>{this.props.content}</Text>
    //         </View>
            
    //     );
    // }
    render() {
    return (
      <View style={styles.lightBoxContainer}>
        <View style={{flex: 8}}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.content}>{this.props.content}</Text>
        </View>
      </View>
    );
  }
}

export default LightBox;
