import React from 'react';

class CreateRecipeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: 'Recipe Name',
      recipeContent: 'Please create a recipe'
    };

    this.handleRecipeContentChange = this.handleRecipeContentChange.bind(this);
    this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRecipeContentChange(event) {
    this.setState({recipeContent: event.target.value});
  }

  handleRecipeNameChange(event) {
    this.setState({recipeName: event.target.value})
  }

  handleSubmit(event) {
    const recipeName = this.state.recipeName
    const recipeContent = this.state.recipeContent
    const recipe = {
      name: recipeName,
      content: recipeContent
    }
    console.log("Recipe to upload: " + JSON.stringify(recipe))
    var recipesUrl = 'http://localhost:5050'
    if (process.env.NODE_ENV === 'production') {
      recipesUrl = 'https://www.sophiesrecipes.com:5050'
    }
    fetch(recipesUrl + "/recipes", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <br></br>
          <textarea value={this.state.recipeName} onChange={this.handleRecipeNameChange} />
        </label>
        <br></br>
        <br></br>
        <label>
          Recipe:
          <br></br>
          <textarea value={this.state.recipeContent} onChange={this.handleRecipeContentChange} />
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default CreateRecipeComponent;
