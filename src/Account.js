import './styles/Recipes.css';
import './styles/App.css';
import './styles/Account.css';
import './styles/LoginPage.css';
import Axios from 'axios';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import ReactLoading from 'react-loading'

function Account() {
    let location = useLocation();
    let navigate = useNavigate();
    function HandleBack() {
        navigate("/recipes", { state: { token: location.state.token, user: location.state.user, Pos: location.state.Pos } })
    }
    function HandleLogout() {
        navigate("/login");
    }
    if (location.state.token && location.state.user) {
        return (
            <div className='background'>
                <div className = "Header">
                <div className="AccountTitle">Account</div>
                <div className="BackButton" onClick={HandleBack}>Back</div>
                </div>
                <div className="EmailBox">
                    <h1 className="EmailText">{location.state.user}</h1>
                </div>
                <button className="loginButton" onClick={HandleLogout}>
                    <div className="loginBText">Logout</div>
                </button>
            </div>


        );
    } else {
        return (<div className="background">
            <ReactLoading className="Loading" type="spin" color="#4A76E9" height={100} width={100} />
        </div>
        );
    }

}

export default Account;