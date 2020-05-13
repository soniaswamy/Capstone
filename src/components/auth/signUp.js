import React, {useState, useContext} from 'react';
import { Link, withRouter} from 'react-router-dom';
import firebase from '../config/firebase-config';

const SignUp = (props) => {
    // const Firebasectxt = useContext(FirebaseContext);
    console.log(props);
    const [inputValues, setInputValues] = useState({
        fname: '', lname: '', email: '', password: ''
      });
    const handleChange = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;
        console.log(inputValues);
        setInputValues({ ...inputValues, [name]: value });
        
    }

   const handleSubmit = async(e) => {
      e.preventDefault();
      //console.log(e);
      console.log(inputValues);
      console.log(firebase);
      try {
          await firebase.signUp(inputValues.fname, inputValues.lname, inputValues.email, inputValues.password)
          await firebase.addfname(inputValues.fname)
          props.history.replace('/home');
        } catch (error) {
          alert(error.message);
      }
    }
   
    return(
         
        <div className="container">           
            <div className="row">
                    <div className="col-xs-12">
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fname">first name</label>
                        <input type="text" name="fname"  className="form-control" onChange={handleChange} id="fname" aria-describedby="fname" placeholder="first name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">last name</label>
                        <input type="text" name="lname" className="form-control" onChange={handleChange} id="lname" aria-describedby="lname" placeholder="lastname"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control" onChange={handleChange} id="password" placeholder="Password"/>
                    </div>            
                    <button type="submit" className="btn btn-primary">SignUp</button>&nbsp;&nbsp;&nbsp;
                    <div className="btn btn-primary"><Link to="/signIn">Log In ?</Link></div>
                </form>
            </div>
        </div>
       </div>
    );
}
export default withRouter(SignUp);