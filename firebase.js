import * as firebase from 'firebase';
import "firebase/firestore";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA4-7h6cskM3I_y0F1maz1YZrhjd8nylQE",
  authDomain: "final-project-eb111.firebaseapp.com",
  projectId: "final-project-eb111",
  storageBucket: "final-project-eb111.appspot.com",
  messagingSenderId: "893741515762",
  appId: "1:893741515762:web:fe23afe409301b49dc616b",
  measurementId: "G-RER63LFF03"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

export default firestore
