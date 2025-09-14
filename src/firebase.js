
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAkQUuV0O8iluDCykY2b_khzfuaYlPT-g",
  authDomain: "todo-list-app-482c7.firebaseapp.com",
  projectId: "todo-list-app-482c7",
  storageBucket: "todo-list-app-482c7.firebasestorage.app",
  messagingSenderId: "311107096290",
  appId: "1:311107096290:web:f91ae328197a1c369ed8bb",
  measurementId: "G-TR0MRDBM2B"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
