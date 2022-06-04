import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD26gX3D_YKoHzMX_zeyFtB-FnNKiFDrVk",
    authDomain: "supermercado-app-865ea.firebaseapp.com",
    projectId: "supermercado-app-865ea",
    storageBucket: "supermercado-app-865ea.appspot.com",
    messagingSenderId: "157137531910",
    appId: "1:157137531910:web:b533003e4531c65de77f87"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const currentUserPromise = () => new Promise((resolve, reject) => {
    onAuthStateChanged(auth, user => {
        resolve(user)
    }, e => reject(e))
})

export { auth, currentUserPromise, db };