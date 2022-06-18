import React from 'react';
import database, { firebase } from '@react-native-firebase/database';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  TextInput,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

export default class Chat extends React.Component {
  state = {
    customerMessage: '',
    driverMessage: '',
    allMessages: [],
    textInputValue: '',
  };

  customerMessages(message) {
    database()
      .ref('/users')
      .push()

      .set({
        customerMessage: message,
      })
      .then(() => this.setState({ customerMessage: message }));

    database()
      .ref('/users')
      .on('value', snapshot => {
        let messages = [];
        snapshot.forEach(element => {
          console.log(element);

          messages.push(element.val());
        });
        this.setState({ allMessages: messages.reverse() });
      });
  }
 componentWillUnmount() {
    const onValueChange = database()
      .ref('/users')
      .on('value', snapshot => {
        let messages = [];
        snapshot.forEach(element => {
          console.log(element);

          messages.push(element.val());
        });
        this.setState({ allMessages: messages.reverse() });
      });
    database().ref(`/users`).off('value', onValueChange);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.allMessages}
          renderItem={function (items) {


            return (
              <View

                style={{
                  
                  alignItems: "center",
                  width: 80,
                  height: 25,
                  margin: 10,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: 'grey',
                  backgroundColor: 'white',
                }}>
                <Text style={{ color: 'black' }}>{items.item.customerMessage}</Text>
              </View>
            );
          }}
          style={{ flex: 1, backgroundColor: 'white' }}
        />

        <View style={{ flexDirection: 'row', width: '100%', margin: 5 }}>
          <TouchableOpacity
            onPress={() => {
              this.customerMessages(this.state.customerMessage);
              this.setState({ textInputValue: '' });
            }}>
            <Icons name="send" size={40} color={'blue'} />
          </TouchableOpacity>
          <TextInput
            style={{ marginLeft: 10 }}
            value={this.state.textInputValue}
            placeholder="Enter message"
            onChangeText={text => {
              this.setState({ customerMessage: text, textInputValue: text });
            }}
          />
        </View>
      </View>
    );
  }
}
