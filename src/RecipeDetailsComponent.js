import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

function usePageViews() {
  let location = useLocation();
  let path = location.pathname;
  let recipeId = path.split("/")[2];
  console.log("path: " + path + ", recipe id: " + recipeId);
  return recipeId;
}

//TODO: this is hitting the api constantly
export default function RecipeDetailsComponent(props) {
  const [recipe, setRecipe] = useState('');
  const [fetchAttempts, setFetchAttemps] = useState(0);
  var id = usePageViews();
  var recipesUrl = 'http://localhost:5050'
  if (process.env.NODE_ENV === 'production') {
    recipesUrl = 'https://www.sophiesrecipes.com:5050'
  }
  if (!(fetchAttempts > 0)) {
    fetch(recipesUrl + "/recipes/" + id)
        .then(res => res.json())
        .then(
          (result) => {
            setRecipe(result);
            setFetchAttemps(1);
            console.log("result: " + JSON.stringify(result));
          },
          (error) => {
            console.log("error: " + error);
          }
        )
  }

  if (recipe) {
    return (
      <div>
        <h2>{recipe.name}</h2>
        <br></br>
        {recipe.content}
      </div>
    )
  } else {
    return (
      <div>
        Loading...
      </div>
    )
  }
}
