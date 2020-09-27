import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBGaSC3aMyTuLPym3Iqxq0U4zvqp4mpixE",
  authDomain: "covid-19-project-bdda5.firebaseapp.com",
  databaseURL: "https://covid-19-project-bdda5.firebaseio.com",
  projectId: "covid-19-project-bdda5",
  storageBucket: "covid-19-project-bdda5.appspot.com",
  messagingSenderId: "57444986633",
  appId: "1:57444986633:web:8ce1d019a5c87fa2fb6dd8",
  measurementId: "G-EBCPVRXTKS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
