import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// var admin = require('firebase-admin');
// var serviceAccount = require('chain-surface-firebase-adminsdk-9vpe1-c831f22884.json');
const firebaseConfig = {
  apiKey: "AIzaSyCYg6gbGYpdZZ8VaCIkrliDb5cW2qJybRY",
  authDomain: "chain-surface.firebaseapp.com",
  projectId: "chain-surface",
  storageBucket: "chain-surface.appspot.com",
  messagingSenderId: "960838924388",
  appId: "1:960838924388:web:1b95993652cc669e9b4771"
};

export const app = initializeApp(firebaseConfig);
/* admin.initializeApp({
       credential: admin.credential.cert(serviceAccount)
   });
*/
export const storage = getStorage(app);