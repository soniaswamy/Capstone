import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import Header from './components/header/header';
import Home from './components/home/home';
import Questions from './components/questions/questions';
import QuestionsAnswers from './components/questions/questionAnswers';
import Comments from './components/questions/comments';
import firebase from './components/config/firebase-config';
import './App.css';


const App = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val)
    })
  })
  const [currentUser, setCurrentUser] = useState('');
    
  useEffect(() => {
    firebase.auth.onAuthStateChanged(user => { 
    //  console.log(user);
      setCurrentUser(user)})
  
  })
  return firebaseInitialized !== false ? (    
      <BrowserRouter>
          <div className="App container-fluid">
          <Header/> 
          { !currentUser ? 
          <Switch>
            <Route exact path="/home" component={SignIn}/>
            <Route exact path="/signIn" component={SignIn}/>
            <Route path="/signUp" component={SignUp}/>
          </Switch>
          :
          <Switch>
            <Route path="/home" component={Home}/> 
            <Route path="/questions"  component={Questions}/>
            <Route  path="/questionAnswers"  component={QuestionsAnswers}/>
            <Route  path="/comment/:id"  component={Comments}/>
          </Switch>
          }
          </div>
      </BrowserRouter>      
  
  ): <div id="loader"><h1>Loading</h1></div>
}


export default App;
