import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCRQav4VQ27XwjsNFrW97lk-6JawmmZ2rE",

  authDomain: "carapaca-5afdf.firebaseapp.com",

  databaseURL: "https://carapaca-5afdf-default-rtdb.firebaseio.com",

  projectId: "carapaca-5afdf",

  storageBucket: "carapaca-5afdf.firebasestorage.app",

  messagingSenderId: "809798042814",

  appId: "1:809798042814:web:ec79618079ffeeab944aef",

  measurementId: "G-CNPHQKVRQ1"

};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };