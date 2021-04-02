import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Modal, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, StatusBar, SafeAreaView, Pressable, Platform } from 'react-native';
import { material } from 'react-native-typography';
import { Metrics, Colors } from '../Themes';
import { Entypo } from '@expo/vector-icons';
import firebase from 'firebase';
import firestore from '../../firebase';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RequestsScreen({ navigation }) {
  const user = firebase.auth().currentUser;
  var docRef = firestore.doc('users/' + user.uid);
  const [name, setName] = useState('');
  docRef.get().then(documentSnapshot => {
    if (documentSnapshot.exists) {
      setName(documentSnapshot.data().name);
    }
  });
  const [date, setDate] = useState(new Date())
  const [note, setNote] = useState('')
  const [message, setMessage] = useState('')
  const [posts, setPosts] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };



  useEffect(()=> {
    //Once the component loads, we want to listen to any new rooms
    const collRef = firestore.collection('requests')
    let unsubscribe = collRef.onSnapshot((docs) => {
      let tempRequests = []
      docs.forEach((doc) => {
        let temp = doc.data()
        temp['key'] = doc.id
        tempRequests.push(temp)
      });
      setPosts(tempRequests)
    });

    return () => {
      //on unmount, unsubscribe
      unsubscribe()
    }
  }, [])

  const add = () => {
    //When a new room is added, we add a doc with the room name to the rooms collection

    const collRef = firestore.collection('requests')
    collRef.add({
      date: date,
      note: note
    })
    setMessage('')
    setModalVisible(!modalVisible)
  }

  const _renderItem = ({item}) => {
    //Should navigate to the room conversation
    return (
      <TouchableOpacity>
        <View style={styles.addChatContainer}>
          <Text style={material.subheading}> {item.date.toDate().toString()} </Text>
          <Text style={material.subheading}> Note: {item.note} </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[material.title, {fontSize: 30}]}>Schedule</Text>
      </View>

      <View style={{flex: 0.1, margin: 10}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Request</Text>
            <View style={{width: '90%', margin: 10}}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="datetime"
                  display="default"
                  onChange={onChange}
                />
            </View>

            <TextInput
              style={styles.input}
              value={note}
              onChangeText={(note) => setNote(note)}
              placeholder="Add a note..."
              multiline={true}
            />
            <View style={styles.modalButtons}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.button2}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={add}
                  >
                  <Text style={styles.button2}>Confirm</Text>
                </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.addpost, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Add Request</Text>
      </Pressable>
    </View>

      <FlatList
        data={posts}
        renderItem={_renderItem}
        style={styles.container}
        keyExtractor={(item, index) => item.key}/>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addChatContainer: {
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    borderTopWidth: Metrics.horizontalLineHeight,
    paddingBottom: Metrics.marginVertical,
    paddingTop: Metrics.marginVertical,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10
  },
  newRoom: {
    borderBottomWidth: Metrics.horizontalLineHeight,
    flex: 1,
    borderBottomColor: Colors.border,
    marginRight: Metrics.marginHorizontal
  },
  listItem: {

  },
  centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 200
},
modalView: {
  margin: 20,
  width: '80%',
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
addpost: {
  borderRadius: 20,
  justifyContent: 'center',
  padding: 10,
  elevation: 2,
  height: 60,
  width: '100%'
},
button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2
},
buttonOpen: {
  backgroundColor: "#F194FF",
},
buttonClose: {
  backgroundColor: "#2196F3",
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  fontSize: 24,
  textAlign: "center"
},
button2: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
modalText: {
  marginBottom: 15,
  textAlign: "center",
  fontWeight: 'bold',
  fontSize: 24,
},
header: {
  flexDirection: 'row',
  flex: 0.1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    width: '100%'
},
modalButtons: {
  flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    width: '100%'
},
input: {
  width: '90%',
  fontSize: 20,
  marginBottom: 10,
  backgroundColor: 'whitesmoke',
  padding: 5,
  borderRadius: 5,
},
});
