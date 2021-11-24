import { getAuth } from '@firebase/auth';
import {initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyABjQBWsLId-Dz9H7hVZIxugBMPzFaZntU",
    authDomain: "impelerconsulting-a35fb.firebaseapp.com",
    projectId: "impelerconsulting-a35fb",
    storageBucket: "impelerconsulting-a35fb.appspot.com",
    messagingSenderId: "641230001906",
    appId: "1:641230001906:web:7bbe90fa98cfbc580f626b",
    measurementId: "G-3YG8PG1BS4"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  const db = getFirestore(app);

  const auth = getAuth(app);

  export {
    db,
    auth
  }
