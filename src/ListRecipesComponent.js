import React from 'react';
import { Link } from "react-router-dom";

class ListRecipesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      recipes: []
    };
  }

  componentDidMount() {
    var recipesUrl = 'http://localhost:5050'
    if (process.env.NODE_ENV === 'production') {
      recipesUrl = 'https://www.sophiesrecipes.com:5050'
    }
    fetch(recipesUrl + "/recipes")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            recipes: result.recipes
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, recipes } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Recipes</h1>
          <ul>
            {recipes.map(recipe => (
              <li key={recipe.recipeId}>
                <Link to={"/recipes/" + recipe.recipeId}>
                  {recipe.recipeId} - {recipe.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default ListRecipesComponent;
