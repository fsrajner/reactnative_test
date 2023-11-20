import { Navigation } from 'react-native-navigation';

import Alert from './Alert';
import LightBox from './LightBox';
import NumberPicker from './NumberPicker';
import Register from './Login/Register';
import Login from './Login/Login';
import Rooms from './Room/Rooms';
import Room from './Room/Room';
import Order from './Room/Order';
import Groups from './Group/Groups';
import Group from './Group/Group';
import Profile from './Profile/Profile';
import ViewProfile from './Profile/ViewProfile';
import Profiles from './Profile/Profiles';
import QRScanner from './Camera/QRScanner';
import QRCode from './Camera/QRCodeGenerator';
import Swiper from './Game/Swiper';
import Post from './Post/Post';
import Conversation from './Messenger/Conversation';
import Conversations from './Messenger/Conversations';

import Test from './Test';

export default function () {
  Navigation.registerComponent('PartyApp.Alert', () => Alert);
  Navigation.registerComponent('PartyApp.LightBox', () => LightBox);
  Navigation.registerComponent('PartyApp.Picker.Number', () => NumberPicker);

  Navigation.registerComponent('PartyApp.Login.Login', () => Login);
  Navigation.registerComponent('PartyApp.Login.Register', () => Register);

  Navigation.registerComponent('PartyApp.Room.Rooms', () => Rooms);
  Navigation.registerComponent('PartyApp.Room.Room', () => Room);
  Navigation.registerComponent('PartyApp.Room.Order', () => Order);

  Navigation.registerComponent('PartyApp.Group.Groups', () => Groups);
  Navigation.registerComponent('PartyApp.Group.Group', () => Group);

  Navigation.registerComponent('PartyApp.Post.Post', () => Post);

  Navigation.registerComponent('PartyApp.Profile.Profile', () => Profile);
  Navigation.registerComponent('PartyApp.Profile.Profiles', () => Profiles);
  Navigation.registerComponent('PartyApp.Profile.ViewProfile', () => ViewProfile);

  Navigation.registerComponent('PartyApp.Camera.QRScanner', () => QRScanner);
  Navigation.registerComponent('PartyApp.Camera.QRCode', () => QRCode);

  Navigation.registerComponent('PartyApp.Test.Test', () => Test);

  Navigation.registerComponent('PartyApp.Game.Swiper', () => Swiper);

  Navigation.registerComponent('PartyApp.Chat.Conversations', () => Conversations);
  Navigation.registerComponent('PartyApp.Chat.Conversation', () => Conversation);

  /* Navigation.registerComponent('PartyApp.Types.Modal', () => Modal);
   Navigation.registerComponent('PartyApp.Types.Push', () => Push);
 
 
   Navigation.registerComponent('PartyApp.Types', () => Types);
   Navigation.registerComponent('PartyApp.Actions', () => Actions);
   Navigation.registerComponent('PartyApp.Transitions', () => Transitions);
 
   Navigation.registerComponent('PartyApp.Types.Drawer', () => Drawer);
   Navigation.registerComponent('PartyApp.Types.Screen', () => Drawer);
   Navigation.registerComponent('PartyApp.Types.LightBox', () => LightBox);
   Navigation.registerComponent('PartyApp.Types.Notification', () => Notification);
   Navigation.registerComponent('PartyApp.Types.TopTabs', () => TopTabs);
 
   Navigation.registerComponent('PartyApp.Transitions.CollapsingHeader', () => CollapsingHeader);
   Navigation.registerComponent('PartyApp.Transitions.SharedElementTransitions', () => SharedElementTransitions);
   Navigation.registerComponent('PartyApp.Transitions.SharedElementTransitions.Cards', () => Cards);
   Navigation.registerComponent('PartyApp.Transitions.SharedElementTransitions.Cards.Info', () => CardsInfo);
   Navigation.registerComponent('PartyApp.Transitions.SharedElementTransitions.Masonry', () => Masonry);
   Navigation.registerComponent('PartyApp.Transitions.SharedElementTransitions.Masonry.Item', () => MasonryItem);*/
}
