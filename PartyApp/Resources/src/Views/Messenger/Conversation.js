import React from 'react';
// import styles from './styles';
import strings from '../../Strings';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import CustomView from './CustomView';


var Parse = require('parse/react-native');
import MessageModel from '../../Model/Message';
import ConversationModel from '../../Model/Conversation';

export default class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      page: 0,
      pageSize: 10,
      loading: false,

      conversationId: this.props.id,
      newConversation: this.props.newConversation,
      conversationParticipants: this.props.conversationParticipants
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    //this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  componentWillMount() {
    this._isMounted = true;
    // this.setState(() => {
    //   return {
    //     messages: require('./data/messages.js'),
    //   };
    // });
    this.loadQuery();
  }

  loadQuery() {
    var _ths = this;
    this.getConversation().then(conversation => {
      var query = new Parse.Query(MessageModel);
      var page = this.state.page;
      var pageSize = this.state.pageSize;
      query.skip(page * pageSize);
      query.limit(pageSize);
      query.descending("create_date");
      query.equalTo('conversation', conversation);
      query.include('from');
      query.find().then((results) => {
        var parsedResults = [];
        results.forEach(function (element) {
          var from = element.get('from');
          parsedResults.push({
            user: {
              _id: from.id,
              name: from.getUsername(),
              avatar: from.get('profile_picture')._url,
            },
            text: element.get('text'),
            _id: element.id,
            createdAt: element.get('create_date'),
            sentAt: element.get('send_date')
          })
        }, this);
        // Do something with the returned Parse.Object values
        _ths.setState({
          messages: [..._ths.state.messages, ...parsedResults],
          loading: false,
          refreshing: false
        });
      }, (error) => {
        alert("Error: " + error.code + " " + error.message);
      });

      let subscription = query.subscribe();
      subscription.on('create', (object) => {
        console.log(object);
        var from = object.get('from');
        var currentUser = Parse.User.current();
        if (from.id != currentUser.id)
          _ths.onReceive({
            _id: object.id,
            text: object.get('text'),
            createdAt: object.get('create_date'),
            user: {
              _id: from.id,
              name: from.getUsername(),
              avatar: from.get('profile_picture')._url,
            }
          });
      });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  onSend(messages = []) {
    this.getConversation().then(conversation => {
      messages.forEach(message => {
        var currentUser = Parse.User.current();
        var parseMessage = new MessageModel.create(currentUser, conversation, message.text);
        parseMessage.save();
      });
    });
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  getConversation() {
    let _ths = this;
    return new Promise((resolve, reject) => {
      if (!_ths.conversation) {
        if (_ths.state.conversationId) {
          var query = new Parse.Query(ConversationModel);
          return query.get(_ths.state.conversationId).then((conversation) => {
            _ths.conversation = conversation;
            resolve(conversation);
          }, error => {
            console.log("coulnd't find conversation ");
          });
        }
        else {
          if (_ths.state.newConversation && _ths.state.conversationParticipants) {
            var participants = _ths.state.conversationParticipants;
            var title = participants.length > 1 ? strings.new_conversation : participants[0].getUsername();
            var thumbnail = participants.length > 1 ? null : participants[0].get('profile_picture')._url;
            var newConversation = ConversationModel.create(_ths.state.conversationParticipants, title, thumbnail);
            newConversation.save().then(() => {
              _ths.conversation = newConversation;
              resolve(newConversation);
            });
          } else {
            console.log("something went wrong at Conversation");
          }
        }
      } else
        resolve(_ths.conversation);

    });
  }

  onReceive(message) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, message),
      };
    });
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => { },
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        //loadEarlier={this.state.loadEarlier}
        //onLoadEarlier={this.onLoadEarlier}
        //isLoadingEarlier={this.state.isLoadingEarlier}

        user={{
          _id: Parse.User.current().id
        }}

        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});