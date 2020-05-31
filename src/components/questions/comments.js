import React, {useState, useEffect} from 'react';
import {withRouter, Link, useParams} from 'react-router-dom';

import Moment from 'react-moment'; 
import firebase from '../config/firebase-config';

const Comments = (props) => {
   // console.log(props);
   
   const id = props.match.params.id;   
   const [userComment, setUserComments] = useState([])
   const [inputValues, setInputValues] = useState({
        comments: '', qid: id, uid: firebase.auth.currentUser.uid
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        //console.log(inputValues);
        setInputValues({ ...inputValues, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            firebase.addComments(inputValues).then(data => {
                //  console.log(data)
                setUserComments([...userComment, data])
                setInputValues({
                    comments: '', qid: id, uid: firebase.auth.currentUser.uid
                })
            });
        } catch (error) {
            alert(error.message);
        }
    }
    const [ comment, setComment] = useState({});
    useEffect(() => {  
        // console.log(id);
        firebase.retrieveCommentsById(id).then(
            res => {
           //console.log('data' , res)
                setComment({...res})
            }
            );
            getAllComments();
     }, []); 
    const getAllComments = () => {
        firebase.getAllCommentsByQuesId(id).then(
            res => { 
                setUserComments([...res])
            }
        )
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <h3>{comment.title}</h3>
                    <span><i>
                            Asked&nbsp;<Moment fromNow>{comment.createdAt}</Moment> &nbsp; | &nbsp;
                            <Link to={'/comment/'+ comment.id}>{userComment.length} Answers</Link>
                    </i></span>
                    <p>Description : {comment.description}</p>
                </div>
                <hr/>                
                <div className="col-xs-12">
                <p><b>{userComment.length} Comments</b></p>
                <div>
                     {userComment.map((item, i) =>
                        <p  key={i}>{item.comments}</p>
                    )} 
                </div>                      
                    <h3>Add Your Comment</h3>
                    <form name="comments" onSubmit={ handleSubmit }>
                        <div className="form-group">
                            <textarea rows="3" cols="20" name="comments"  className="form-control"
                             onChange={handleChange} value={inputValues.comments}></textarea>
                        </div> 
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Post Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default(Comments);