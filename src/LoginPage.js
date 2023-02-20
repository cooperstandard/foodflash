import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import './App.css';
import './Recipes.css'
import './CreateAccount.js'
import { Link, redirect, Navigate } from "react-router-dom"

import Recipes from './Recipes';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: null,
            token: null,
        }
    }


    HandleLogin = async (event) => {
        event.preventDefault();
        const login = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: event.target.email.value, password: event.target.password.value })
        };
        try {
            const response = await fetch('https://concierge.cooperstandard.org:8443/api/user/login', login)
            const data = await response.json();
            if (data.message == "Wrong details please check at once") {
                throw new Error("Error with login");
            } else {
                this.setState({ token: data.token })
                //console.log(this.state.token)
                this.HandleAuth(data)
            }
        } catch (error) {
            console.log(error);
            this.setState({ error: error })
        }
    }
    HandleAuth = async (auth) => {
        try {
            const authHead = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + auth.token },
            };
            const response = await fetch('https://concierge.cooperstandard.org:8443/api/authenticate', authHead)
            const authRes = await response.json();
            console.log(authRes);
            if (authRes.message == "token verification failed") {
                throw new Error("Error User Token Authentication");
            } else {
                console.log(authRes.message);
                this.setState({ user: authRes.user });
            }
        } catch (error) {
            console.log(error);
            this.setState({ error: error })
        }
    }


    render() {
        return (
            <div className="background">
                <h1 className="titleText">Login</h1>
                {this.state.user && (
                    
                    <Navigate to="/recipes" replace={true} state = {{ token : this.state.token}} />
                )}
                {this.state.error && (
                    <p className="errorText">Your username or password is incorrect!</p>
                )}
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