import { StyleSheet, Platform, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingTop: 5
  },
  propertyContainer: {
    height: 45,
    flexDirection: 'row'
  },
  alertContainer: {
    height: 100,
    backgroundColor: '#ff505c',
    padding: 16,
    margin: 10,
  },
  lightBoxContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.3,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 16,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  content: {
    textAlign: 'center',
    marginTop: 10,
  },
  paddingView: {
    width: 15
  },
  floatingLabel: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  fieldLabel: {
    height: 15,
    fontSize: 10,
    color: '#B1B1B1'
  },
  fieldContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative'
  },
  withBorder: {
    borderBottomWidth: 1 / 2,
    borderColor: '#C8C7CC',
  },
  valueText: {
    height: (Platform.OS == 'ios' ? 20 : 60),
    fontSize: 16,
    color: '#111111'
  },
  focused: {
    color: "#1482fe"
  },
  image: {
    width: Dimensions.get('window').width * 0.7,
    height: 60,
  },
  scrollContainer: {
    flex: 1,
  },
  imageStyle: {
    marginLeft: 15,
    marginRight: 20,
    alignSelf: 'center',
    width: 20,
    height: 24,
    justifyContent: 'center'
  }
});

export default styles;
