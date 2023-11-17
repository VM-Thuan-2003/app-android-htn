import firebase from 'firebase/compat/app'
import {getDatabase} from 'firebase/database'
const firebaseConfig = {
    apiKey: "AIzaSyB34_KNcAW5KI2JrcU7_4F_OEpctzn_yWw",
    authDomain: "firebas-htn.firebaseapp.com",
    databaseURL: "https://firebas-htn-default-rtdb.firebaseio.com",
    projectId: "firebas-htn",
    storageBucket: "firebas-htn.appspot.com",
    messagingSenderId: "640676408163",
    appId: "1:640676408163:web:5848a87b09350557578156",
    measurementId: "G-1VLQBH5G6T"
};
if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
}
const db = getDatabase()
export {db}