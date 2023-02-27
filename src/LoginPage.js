import React, { useEffect, useState } from 'react';
import './styles/LoginPage.css';
import './styles/index.css'
import './styles/App.css';
import './styles/Recipes.css'
import './CreateAccount.js'
import "./fonts/ComicNeue-Regular.ttf"
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
            const response = await fetch('https://concierge.cooperstandard.org/api/user/login', login)
            const data = await response.json();
            //console.log(data);
            if (data.message == "Wrong details please check at once") {
                throw new Error("Error with login");
            } else {
                this.setState({ token: data.token })
                this.setState({user : data.email})
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
            const response = await fetch('https://concierge.cooperstandard.org/api/authenticate', authHead)
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
                <div className="Header">
                <div className="loginTitle">Log In</div>
                </div>
                {this.state.user && (

                    <Navigate to="/recipes" replace={true} state={{ token: this.state.token , user : this.state.user, Pos:1}} />
                )}
                {this.state.error && (
                    <div className="errorText">Your username or password is incorrect!</div>
                )}
                <form onSubmit={this.HandleLogin}>
                    <input type="text" id="email" name="email" className="emailBox" placeholder="Email"></input>
                    <input type="text" id="password" name="password" className="passwordBox" placeholder="Password" ></input>

                    <button type="submit" className="loginButton">
                        <div className="loginBText">Log In</div>
                    </button>
                </form>
                <Link to='/register'>
                    <button className="createAccButton">
                        <div className="createAccText">Sign Up</div>
                    </button>
                </Link>



            </div>
        );
    }
}
export default LoginForm