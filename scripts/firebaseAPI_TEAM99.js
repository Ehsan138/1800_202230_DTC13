//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyDNEn_oaQdNkXK4l4DAbNlMg9VnW750W_U",
    authDomain: "appmyhabit.firebaseapp.com",
    projectId: "appmyhabit",
    storageBucket: "appmyhabit.appspot.com",
    messagingSenderId: "730903132957",
    appId: "1:730903132957:web:596aa4dc1e017a1f1afff4",
    measurementId: "G-22MLH2CS1F"
  };
  
//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();