import './styles/Recipes.css';
import './styles/App.css'
import './styles/index.css'
import './styles/SavedRecipes.css'
import './styles/Recipe_info.css'
import Axios from 'axios';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ReactLoading from "react-loading";

function Feedback() {
    let location = useLocation();
    let navigate = useNavigate();
    const [body,setBody] = useState();
    const [author,setAuthor] = useState();

    async function HandleFeedback(event) {
        event.preventDefault();
        const feedB = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ author: author, message: body })
        };
        const response = await fetch('https://concierge.cooperstandard.org/api/feedback', feedB)
        const res = await response.json();
        console.log(res);
    }
    function HandleBack() {
        navigate("/account", { state: { token: location.state.token, user: location.state.user, Pos: location.state.Pos } })
    }


    return (
        <div className="background">
            <div className="Header">
                <div className="BackButton" onClick={HandleBack}>Back</div>
                <div className="AccountTitle">Feedback</div>
            </div>
            <form onSubmit={HandleFeedback}>
                <input type="text" id="author" name="author" className="emailBox" placeholder="Name" style={{top:"175px"}} value = {author} onChange={e=>setAuthor(e.target.value)}></input>
                <textarea type="text" id="message" name="message" className="emailBox" style={{top:"250px" , height:"300px"}}value = {body} onChange={e=>setBody(e.target.value)} ></textarea>
                <button type = "submit" className = "loginButton" style = {{top:"580px"}}>
                <div className="loginBText" style ={{width:"200px"}}>Send Feedback</div>
                </button>
            </form>




        </div >

    );




}
export default Feedback;