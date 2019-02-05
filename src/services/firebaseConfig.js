import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyD4GXcOOnwGQVs85qoISXhZCGT9HzpOu_M",
    authDomain: "app-vila-b17da.firebaseapp.com",
    databaseURL: "https://app-vila-b17da.firebaseio.com",
    projectId: "app-vila-b17da",
    storageBucket: "app-vila-b17da.appspot.com",
    messagingSenderId: "526120878080"
  };
  
export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();