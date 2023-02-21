import './Recipes.css';
import './App.css'
import './Account.css'
import Axios from 'axios';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import ReactLoading from 'react-loading'

function Account(){
let location = useLocation();
let navigate = useNavigate();
function HandleBack() {
    navigate("/recipes", { state: { token: location.state.token,user:location.state.user } })
}
if (location.state.token){
return(
    <div className='background'>
        <h1 className = "AccountTitle">Account</h1>
        <button onClick={HandleBack} className="BackButton">
                    <h1 className="BackButtonText">Back</h1>
                </button>
        <div className = "EmailBox">
        <h1 className = "EmailText">{location.state.user}</h1>
        </div>
    </div>


);
}else{
    return (<div className = "background">
    <ReactLoading className = "Loading" type = "bubbles" color = "#4A76E9" height={100} width={100}/>
  </div>
    );
}

}

export default Account;