import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import firebase from '../config/firebase-config';
const home = (props) => {
    if(!firebase.getCurrentUsername()){
        //not logged in
        alert('Please login First');
        props.history.replace('/signIn');
        return null;
    }

    return (
        <div className="container">
            <div className="col-xs-12">
                <div className="col-xs-6">
                    <div className="userDetails">
                        <div className="avatar col-xs-4">
                            <img alt="userpic" src="https://via.placeholder.com/150X150.png?text=UserProfile"/>
                        </div>
                        <div className="user col-xs-4">
                            <span>Username: </span>
                            <span> Hi {firebase.getCurrentUsername()}</span>
                        </div>  
                    </div>                                      
                </div>
                <div className="col-xs-6">
                    <span>Member since: </span>
                </div>
            </div>
            
            <div className="col-xs-12">
            <hr/>
            <div className="questions">
                <div className="row">
                    <div className="col-xs-4">
                        <h4>Feeds</h4>
                        <p><Link to="/questions" >Questions</Link></p>
                        <p><Link to="/questionAnswers" >Answers</Link></p>
                    </div>
                    <div className="col-xs-8">
                        <h4>Questions</h4>
                    </div>
                </div>
            </div>
            </div>
        </div>
       
    );
    
}
export default withRouter(home);