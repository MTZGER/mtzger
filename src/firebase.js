import firebase from "firebase"
import * as admin from "firebase-admin"

const firebaseApp = firebase.initializeApp({
    // apiKey: "AIzaSyB8N3Manlo61KqhCNi9u057yYG3qyAkJhA",
    // authDomain: "zoom-b16c0.firebaseapp.com",
    // projectId: "zoom-b16c0",
    // storageBucket: "zoom-b16c0.appspot.com",
    // messagingSenderId: "200336098670",
    // appId: "1:200336098670:web:9a35fe1d9c98cd08ef6d7f",
    // measurementId: "G-PW99P4VCR0"
    apiKey: "AIzaSyDHMPzv_GApJUnYWZ32DkQwzelmvLFqksM",
    authDomain: "mtzger-d5e6c.firebaseapp.com",
    databaseURL: "https://mtzger-d5e6c.firebaseio.com",
    projectId: "mtzger-d5e6c",
    storageBucket: "mtzger-d5e6c.appspot.com",
    messagingSenderId: "45726699749",
    appId: "1:45726699749:web:05b7da68c3498e6d98840c",
    measurementId: "G-0D8F82834Y"
})
// admin.initializeApp({
//     apiKey: "AIzaSyB8N3Manlo61KqhCNi9u057yYG3qyAkJhA",
//     authDomain: "zoom-b16c0.firebaseapp.com",
//     projectId: "zoom-b16c0",
//     storageBucket: "zoom-b16c0.appspot.com",
//     messagingSenderId: "200336098670",
//     appId: "1:200336098670:web:9a35fe1d9c98cd08ef6d7f",
//     measurementId: "G-PW99P4VCR0"
// })

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://mtzger-d5e6c.firebaseio.com",
    databaseURL: 'https://mtzger.firebaseio.com'
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider, admin }
// export { db, auth, storage, provider }