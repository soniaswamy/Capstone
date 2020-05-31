import React, {useState} from 'react';
import { Link, withRouter} from 'react-router-dom';
import firebase from '../config/firebase-config';

const SignIn =  (props) => {
    const [inputValues, setInputValues] = useState({
        email: '', password: ''
      });
      const handleChange = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;
        console.log(inputValues);
        setInputValues({ ...inputValues, [name]: value });
        
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await firebase.signIn(inputValues.email, inputValues.password);            
          props.history.replace('/home');
        } catch(error) {
            alert(error.message);
        }
    }
    return(
        <div className="container">
                 <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" onChange={handleChange} className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"  onChange={handleChange} className="form-control" name="password" id="password" placeholder="Password"/>
                    </div>            
                    <button type="submit" className="btn btn-primary">Submit</button>&nbsp;&nbsp;&nbsp;
                    <div className="btn btn-primary"><Link to="/signUp">Not a Member ?</Link></div>
                </form>
        </div>
    );
}
export default withRouter(SignIn);