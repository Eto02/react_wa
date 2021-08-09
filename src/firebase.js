import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyBUBwp2ke2yJuN2_V5-7XK1GcDWJDeiHJs",
    authDomain: "react-wa.firebaseapp.com",
    projectId: "react-wa",
    storageBucket: "react-wa.appspot.com",
    messagingSenderId: "917805188407",
    appId: "1:917805188407:web:e2099f751ac69b1b4406b2"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();
  const auth= firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()
  
  export {auth,provider}
  export default db;  