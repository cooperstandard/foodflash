import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import './App.css';
import './Recipes.css'
import {Link} from "react-router-dom"

class CreateAccount extends React.Component {

    HandleRegister = (event) => {
        event.preventDefault();
        const register = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: event.target.name.value, password: event.target.password.value, email: event.target.email.value })
        };
        fetch('https://concierge.cooperstandard.org:8443/api/signup', register)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));

    }


    render() {
        return (
            <div className='background'>
                <h1 className="titleText">Create Account</h1>
                <Link to='/login'>
                    <button className="BackButton">
                        <h1 className="BackButtonText">Back</h1>
                    </button>
                </Link>
                <form onSubmit={this.HandleRegister}>
                    <input type="text" id="email" name="email" className="emailBox" placeholder="Email"></input>
                    <input type="text" id="name" name="name" className="CreateAccUsernameBox" placeholder="Username"></input>
                    <input type="text" id="password" name="password" className="CreateAccPasswordBox" placeholder="Password"></input>
                    <button type="submit" className="createAccButton">
                        <h2 className="createAccText">Create Account</h2>
                    </button>
                </form>

            </div>



        );
    }




}

export default CreateAccount