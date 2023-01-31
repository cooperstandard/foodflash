//import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import React,{useEffect, useState} from 'react';

function App() {

  const [recipes, setRecipes]=useState([])

  const fetchData = () => {
    fetch("http://concierge.cooperstandard.org:3000/api/all")
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        setRecipes(data)
      })
  }

  useEffect(() => {
    fetchData();
  }, [])

  /*
  useEffect(() => {
    console.log(recipes)
  }, [recipes]);
  */
  const fetchRecipes = async() => {
    const response = Axios("/api/all");
    console.log(response)
    setRecipes(response.data);
  }


  return (
    <div className="App">
      {
        recipes && recipes.map(recipe => {

          return(
            <div key={recipe._id} style={{alignItems:'center',margin:'20px 60px',background:'grey'}}>
            <h4>{recipe.title}</h4>
            <ul>{recipe.ingredients.map(ingredient => {
              return(
                <li>{ingredient}</li>
              )
            })}</ul>
            

            </div>
          )


        })
      }
    
    </div>
  );
}

export default App;
