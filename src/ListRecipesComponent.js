import React from 'react';

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
    fetch("http://localhost:5050/recipes")
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
              <li key={recipe.name}>

                {recipe.name} - {recipe.link}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default ListRecipesComponent;
