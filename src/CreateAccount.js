import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './styles/LoginPage.css';
import './styles/App.css';
import './styles/Recipes.css'
import { Link , Navigate} from "react-router-dom"
class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            token: null,
            error: false
        }
    }

    HandleRegister = async (event) => {
        event.preventDefault();
        const register = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: event.target.name.value, password: event.target.password.value, email: event.target.email.value })
        };
        const response = await fetch('https://concierge.cooperstandard.org/api/user/signup', register)
        const signupRes = await response.json();
        if (signupRes.success == true) {
            //console.log(signupRes)
            this.setState({ user_id: signupRes.data.userID, token: signupRes.data.token });
        }else{
            this.setState({error:true});
        }
    }


    render() {
        return (


            <div className='background'>
                <h1 className="titleText">Create Account</h1>
                {(this.state.token) && (

                    <Navigate to="/recipes" replace={true} state={{ token: this.state.token, user: this.state.user_id, Pos: 1 }} />
                )}
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
                    {(this.state.error) && (
                    <p className="EmailErrorText">This Email is Already in use!</p>
                )}
                </form>

            </div>



        );
    }




}

export default CreateAccount