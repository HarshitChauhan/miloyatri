// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
// import * as firebase from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn5L7OcwqFAIxtUXlLhpb9X1MAqHBm1h4",
  authDomain: "milo-yatri.firebaseapp.com",
  projectId: "milo-yatri",
  storageBucket: "milo-yatri.appspot.com",
  messagingSenderId: "1007469413288",
  appId: "1:1007469413288:web:bc5b96fd82010f66c6139d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
// const auth = firebase.auth();
const db= getFirestore();

const provider =new GoogleAuthProvider();

export { auth , db, provider };