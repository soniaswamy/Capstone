import React, {useState} from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const config = {
    apiKey: "AIzaSyDyq1DfpcvP2JXpvWwucqUgLKtmbwfunIM",
    authDomain: "capstone-fc0bf.firebaseapp.com",
    databaseURL: "https://capstone-fc0bf.firebaseio.com",
    projectId: "capstone-fc0bf",
    storageBucket: "capstone-fc0bf.appspot.com",
    messagingSenderId: "1099499369461",
    appId: "1:1099499369461:web:b666e3c15c1c8d3f19e6bc",
    measurementId: "G-SD79TG2ZRY"
}   
class Firebase {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.firestore();
    }
    // *** Auth API ***
       signIn(email, password) {
           return this.auth.signInWithEmailAndPassword(email, password);
       }
       logout() {
           return this.auth.signOut();
       }

       async signUp(fname, lname, email, password) {
            await this.auth.createUserWithEmailAndPassword(email, password)
            return this.auth.currentUser.updateProfile({
                displayName: fname 
            })
       }
       addfname(fname) {
            if(!this.auth.currentUser) {
                return alert('Not authorized')
            }
            return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
                fname
            })
	   }
       isInitialized() {
           return new Promise (resolve => {
               this.auth.onAuthStateChanged(resolve)
           })
       }

     getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName;
       }
  }

 // export const FirebaseContext = React.createContext(null);  

 export default new Firebase()