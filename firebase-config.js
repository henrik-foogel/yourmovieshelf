import firebase from 'firebase'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC0IlfNgPm2lvDFqvQhxUHpRYfYkTZ8N_8",
    authDomain: "the-movie-project-205d1.firebaseapp.com",
    databaseURL: "https://the-movie-project-205d1.firebaseio.com",
    projectId: "the-movie-project-205d1",
    storageBucket: "",
    messagingSenderId: "963734393158",
    appId: "1:963734393158:web:933ad102e08a03b48f1547"
  };
  const fb = firebase.initializeApp(config);
  const db = firebase.firestore();
  export {db, fb}