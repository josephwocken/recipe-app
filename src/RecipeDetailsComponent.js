import React from "react";
import { useLocation } from "react-router-dom";

function usePageViews() {
  let location = useLocation();
  let path = location.pathname;
  let recipeId = path.split("/")[2];
  console.log("path: " + path + ", recipe id: " + recipeId);
  return recipeId;
}

//TODO: not working
async function getRecipeDetails(recipeId) {
  const response = await fetch("http://localhost:5050/recipes/" + recipeId)
  return response.json();
}

export default function RecipeDetailsComponent() {
  var id = usePageViews();
  var recipeDetails = getRecipeDetails(id);
  console.log("id: " + id);
  console.log("details: " + JSON.stringify(recipeDetails));
  return (<div/>)
}
