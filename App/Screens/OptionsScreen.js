import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button } from 'react-native';
import { material } from 'react-native-typography';
import firestore from '../../firebase';
import firebase from 'firebase';


export default function App({navigation}) {


  return (
    <View style={styles.container}>
    <Button
      title='Logout'
      onPress={()=> firebase.auth().signOut().then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
})}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
