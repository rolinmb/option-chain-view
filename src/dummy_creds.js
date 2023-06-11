import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// var admin = require('firebase-admin');
// var serviceAccount = require('dummy-admin-cred.json');
const firebaseConfig = {
  apiKey: "dummy-key",
  authDomain: "dummy-name.firebaseapp.com",
  projectId: "dummyProjectId",
  storageBucket: "dummy-bucket.appspot.com",
  messagingSenderId: "dummySenderId",
  appId: "dummyAppId"
};

export const app = initializeApp(firebaseConfig);
/* admin.initializeApp({
       credential: admin.credential.cert(serviceAccount)
   });
*/
export const storage = getStorage(app);