import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.react_app_apiKey,
  authDomain: process.env.react_app_authDomain,
  projectId: process.env.react_app_projectId,
  storageBucket: process.env.react_app_storageBucket,
  messagingSenderId: process.env.react_app_messagingSenderId,
  appId: process.env.react_app_appId,
  measurementId: process.env.react_app_measurementId
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth(app)

const provider = new GoogleAuthProvider();

export {auth, provider, db}