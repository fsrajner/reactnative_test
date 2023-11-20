import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Platform,
  Image
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import TextProperty from '../../Controls/TextProperty';
import Start from '../../Start';

import styles from '../../Styles';
import strings from '../../Strings';

import PostModel from '../../Model/Post';
import RoomModel from '../../Model/Room';
import GroupModel from '../../Model/Group';

var Parse = require('parse/react-native');
var ImagePicker = require('react-native-image-picker');


class Post extends Component {
  constructor(props) {
    super(props);
    this.parentId = this.props.id;
    this.fromPage = this.props.fromPage;
    this.state = {}

  }

  render() {
    return (
      <View style={styles.container}>
        <TextProperty
          isSecure={false}
          onChangeTextValue={(text) => { this.setState({ text: text }) }} />
        <Image source={this.state.avatarSource} style={styles.image} />
        <Button title="choose image" onPress={this.onPickImage} />
        <Button title={strings.post} onPress={this.onPost} />
      </View>
    )
  }

  onPickImage = () => {
    // More info on all the options is below in the README...just some common use cases shown here
    var options = {
      title: 'Select Avatar',
      customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          imageData: 'data:image/jpeg;base64,' + response.data
        });
      }
    });
  }

  onPost = () => {
    var currentUser = Parse.User.current();
    var text = this.state.text;
    if (currentUser) {
      var file = new Parse.File("image.jpg", { base64: this.state.imageData });
      return file.save().then(() => {
        var parentQuery;
        if (this.fromPage == "Room")
          parentQuery = new Parse.Query(RoomModel);
        else
          parentQuery = new Parse.Query(GroupModel);

        return parentQuery.get(this.parentId).then(parent => {
          var post = PostModel.create(currentUser, text, file, parent);
          return post.save().then(() => {
            parent.addUnique("posts", post);
            return parent.save().then(() => {
              this.props.navigator.pop({
                animated: true, // does the pop have transition animation or does it happen immediately (optional)
                animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
              });
            })

          }).catch(error => {
            console.log(error);
          });
        })
          .catch(error => {
            console.log(error);
          });

      }, function (error) {
        // The file either could not be read, or could not be saved to Parse.
      });

    }
  }
};

export default Post;