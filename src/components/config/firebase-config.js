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
      //console.log(this.auth.currentUser.uid);
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
        

     // *** Questions & Answers  API ***  
       addQuestions(data) {
        data.createdAt = new Date().toISOString();
        this.db.collection("questions").add(data)
            .then(function() {
                console.log("Questions successfully Submitted!");
            
            })
            .catch(function(error) {
                console.error("Error Question: ", error);
            }); 
       }
       retrieveUserQuesAns() {
          return  this.db.collection("questions").where('uid', '==', this.auth.currentUser.uid).get()
          .then(function(res) {
               // console.log('QA' , res.ME.docChanges);
              // console.log('id' , res);
                let arr = [];
                res.forEach(doc => {
                    //console.log(doc.id);
                    let obj = {...doc.data(), id: doc.id}
                        arr.push(obj)
                    }); 
                //console.log(arr);
                return arr;
            
            })
            .catch(function(error) {
                console.error("Error Question: ", error);
            }); 
                       
       }
       retrieveCommentsById(id) {
           // console.log(id);
            return  this.db.collection("questions").doc(id).get()
          .then(function(res) { 
              // console.log(res);
              let obj = {...res.data(), id: id}
              return obj;
            })
          .catch(function(error) {
              console.error("Error Question: ", error);
          }); 
       }
       addComments(data) {
        data.createdAt = new Date().toISOString();
      //  data.comments = this.db.collection('questions').doc(data.qid);
        return this.db.collection("comments").add(data)
            .then(res => {
               //  console.log(res);
                console.log("comments successfully Submitted!");
            return this.db.collection('comments').doc(res.id).get()
            
            }).then(result => { 
                //console.log('comments', result.data());
                let obj = {...result.data(), commentId: result.id}
                return obj;
            })
            .catch(function(error) {
                console.error("Error Question: ", error);
            }); 
        }
      getAllCommentsByQuesId(id){
        return  this.db.collection("comments").where('qid', '==', id).get()
        .then(function(res) {
             // console.log('QA' , res.ME.docChanges);
            // console.log('id' , res);
              let arr = [];
              res.forEach(doc => {
                  //console.log(doc.id);
                  let obj = {...doc.data(), id: doc.id}
                      arr.push(obj)
                  }); 
              //console.log(arr);
              return arr;
          
          })
          .catch(function(error) {
              console.error("Error Question: ", error);
          }); 
      }
       
  }


 export default new Firebase()