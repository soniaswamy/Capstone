import React, {useEffect, useState} from 'react';
import {withRouter, Link} from 'react-router-dom';
 
import Moment from 'react-moment'; 
import firebase from '../config/firebase-config';

const QuestionAnswers = (props) => {
   // console.log(props); 
   const [userData, setUserData] = useState([]);
    useEffect(() => {  
       firebase.retrieveUserQuesAns().then(
           res => {
         //  console.log('data' , res)
           setUserData([...res])
           }
           );
    }, []); 
    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <h3>Questions</h3>
                    {userData.map((item, i) =>
                        <div key={i}>
                        <p><strong>{item.title}</strong></p>
                        <span><i>
                            Asked&nbsp;<Moment fromNow>{item.createdAt}</Moment> &nbsp; | &nbsp;
                            <Link to={'/comment/'+ item.id}>Answers</Link>
                        </i></span>
                        <p>Description: {item.description}</p>
                        </div>
                    )}                  
                                      
                </div>
            </div>
        </div>
    );

}
export default withRouter(QuestionAnswers)