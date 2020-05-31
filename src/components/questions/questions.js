import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import firebase from '../config/firebase-config';

const Questions = (props) => {
    const [inputValues, setInputValues] = useState({
        title: '', description: '', tags: '', uid: firebase.auth.currentUser.uid
      });
    const handleChange = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;
        console.log(inputValues);
        setInputValues({ ...inputValues, [name]: value });
        
    }
    const handleSubmit = (e) => { 
        //console.log(e);
        e.preventDefault();
        try {
            firebase.addQuestions(inputValues, inputValues.uid);
            props.history.replace('/questionAnswers');
        } catch (error) {
            alert(error.message);
        }
    }
    return(
        <div className="container">
            <div className="row">
            <div className="col-xs-12">
                <h3>Ask a Public Question</h3>
                <form name="questions" onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input  className="form-control" onChange={handleChange} id="title"  type="text" name="title"/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                     <textarea rows="3"  className="form-control" onChange={handleChange}  id="description"  cols="20" name="description"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Tags</label>
                    <input type="text"  className="form-control" onChange={handleChange} id="tags"  name="tags"/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Post Question</button>
                </div>
                </form>
            </div>  
            </div> 
        </div>
    );
}
export default withRouter(Questions);