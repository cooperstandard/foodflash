//import logo from './logo.svg';
import './Recipes.css';
import './App.css'
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { userContext } from './userContext';

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      error: null,
      recipes: null,
      pos: 0,
      token: null
    }
  }

  HandleRecipes = async () => {
    try {
      const response = await fetch("https://concierge.cooperstandard.org:8443/api/recipe/all");
      const data = await response.json();
      if (typeof (data) !== 'undefined') {
        this.setState({ recipes: data });
        console.log(data);
      } else {
        throw new Error("Error Loading Recipes");
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.HandleRecipes();
  }

  HandleLike = () => {
    if (this.state.pos < this.state.recipes.length - 1) {
      this.setState({ pos: this.state.pos + 1 })
    } else {
      this.setState({ pos: 0 });
    }
  }
  HandleDislike = () => {
    if (this.state.pos < this.state.recipes.length - 1) {
      this.setState({ pos: this.state.pos + 1 })
    } else {
      this.setState({ pos: 0 });
    }
  }

  render() {
    if (this.state.recipes && (this.state.pos >= 0)) {
      return (

        <div className="App">

          <div key={this.state.recipes[this.state.pos]._id} className="background">
            <h1>{this.state.recipes[this.state.pos].title}</h1>
            <h3>{this.state.recipes[this.state.pos].description}</h3>
            <img src={this.state.recipes[this.state.pos].photos[0]} className="RecipeImage"></img>
            <button className="DislikeButton" onClick={this.HandleDislike}></button>
            <button className="LikeButton" onClick={this.HandleLike}></button>
            <ul>{this.state.recipes[this.state.pos].ingredients.map(ingredient => {
              return (
                <li key={ingredient}>{ingredient}</li>
              )
            })}</ul>
          </div>
        </div>
      )
    } else {
      return (<h1>Loading...</h1>)
    }
  }
}

export default Recipes;