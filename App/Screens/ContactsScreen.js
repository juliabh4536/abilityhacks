import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Modal, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, StatusBar, SafeAreaView, Pressable, Linking } from 'react-native';
import { material } from 'react-native-typography';
import { Metrics, Colors } from '../Themes';
import { Entypo } from '@expo/vector-icons';
import firebase from 'firebase';
import firestore from '../../firebase';
import {Facetime} from 'react-native-openanything';

export default function ContactsScreen({ navigation }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [contacts, setContacts] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(()=> {
    //Once the component loads, we want to listen to any new rooms
    const collRef = firestore.collection('contacts')
    let unsubscribe = collRef.onSnapshot((docs) => {
      let tempContacts = []
      docs.forEach((doc) => {
        let temp = doc.data()
        temp['key'] = doc.id
        tempContacts.push(temp)
      });
      setContacts(tempContacts)
    });

    return () => {
      //on unmount, unsubscribe
      unsubscribe()
    }
  }, [])

  const add = () => {
    //When a new room is added, we add a doc with the room name to the rooms collection
    const collRef = firestore.collection('contacts')
    collRef.add({
      name: name,
      phone: phone
    })
    setName('')
    setPhone('')
    setModalVisible(!modalVisible)
  }

  const _renderItem = ({item}) => {
    //Should navigate to the room conversation

    return (
      <TouchableOpacity onPress={() => Linking.openURL('facetime:'+ item.phone) }>
        <View style={[styles.addChatContainer,{borderTopWidth: 0, borderBottomWidth: 1}]}>
          <Text style={material.subheading}> {item.name} </Text>
          <Text style={material.subheading}> {item.phone} </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={material.title}>Contacts</Text>
          <View>
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
                <Text style={styles.modalText}>Add Contact</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={(name) => setName(name)}
                  placeholder="Name"
                />
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={(phone) => setPhone(phone)}
                  placeholder="Phone"
                />
                <View style={styles.header}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={add}
                >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>

                </View>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Add Contact</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={contacts}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    borderTopWidth: Metrics.horizontalLineHeight,
    paddingBottom: Metrics.marginVertical,
    paddingTop: Metrics.marginVertical
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
  marginTop: 22
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
