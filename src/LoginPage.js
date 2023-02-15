import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import './App.css';
import './Recipes.css'
import './CreateAccount.js'
import { Link , useNavigate} from "react-router-dom"



function PassError(props) {
    const errorID = props.errorID;
    if (typeof (errorID) == 401) {
        return <p className="errorText">Your username or password is incorrect!</p>;
    } else {
        return <p></p>;
    }
}

class LoginForm extends React.Component {
    
    HandleLogin = (event) => {
        event.preventDefault();
        const login = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: event.target.email.value, password: event.target.password.value })
        };
        fetch('https://concierge.cooperstandard.org:8443/api/user/login', login)
            .then(response => response.json())
            .then(responseJSON => {
                console.log(responseJSON.success);
                if (responseJSON.success == true){
                
                }
            })
            //.then(data => this.setState({ postId: data.id, }));
        }

    render() {
        return (
            <div className="background">
                <h1 className="titleText">Login</h1>
                <form onSubmit={this.HandleLogin}>
                    <input type="text" id="email" name="email" className="emailBox" placeholder="Email"></input>
                    <input type="text" id="password" name="password" className="passwordBox" placeholder="Password"></input>

                    <button type="submit" className="loginButton">
                        <h2 className="loginBText">Login</h2>
                    </button>
                </form>
                <Link to='/register'>
                    <button className="createAccButton">
                        <h2 className="createAccText">Create Account</h2>
                    </button>
                </Link>



            </div>
        );
    }
}
export default LoginForm