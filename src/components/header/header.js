import React, { useState, useEffect } from 'react';
import { Link, withRouter} from 'react-router-dom';
import firebase from '../config/firebase-config';
const Header = (props) => {
    // console.log(firebase.auth);
    const [currentUser, setCurrentUser] = useState('');
    
    useEffect(() => {
      firebase.auth.onAuthStateChanged(user => { 
       // console.log(user);
        setCurrentUser(user)})
    
    })
    const handleLogOut = async(e) => {
        e.preventDefault();
        try {
            await firebase.logout()
            props.history.replace('/signIn');
          } catch (error) {
            alert(error.message);
        }
    }
    const handleChange = () => {

    }
    return(
        <div className="container">
            <div className="header">
                <div className="row">
                    <div className="col-xs-12">
                    <div className="col-5 col-sm-3">Logo</div>
                    <div className="col-5 col-sm-2"><Link to="/home">Home</Link></div>
                    <div className="col-5 col-sm-3">
                    <form>
                        <input type="text" onChange={handleChange} className="search" name="search" value="" placeholder="Search Repair my ship"/>
                    </form>
                    </div>
                     { !currentUser ?
                          <React.Fragment>
                          <div className="col-5 col-sm-2"><Link to="/signUp">Signup</Link></div>
                          <div className="col-5 col-sm-2"><Link to="/signIn">Signin</Link></div>
                      </React.Fragment> 
                        :  
                          <div className="col-5 col-sm-2" onClick={handleLogOut}>Logout</div>                    
                    }
                    </div>          
                </div>
            </div>        
        </div>
    );
}
export default withRouter(Header);


