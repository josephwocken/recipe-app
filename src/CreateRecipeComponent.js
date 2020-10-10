import React from 'react';

class CreateRecipeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please create a recipe'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const recipeToUpload = this.state.value
    const recipe = {
      contents: recipeToUpload,
      name: 'some-name',
      link: 'some-link'
    }
    console.log("Recipe to upload: " + JSON.stringify(recipe))
    fetch("http://localhost:5050/recipes", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log("Results: " + JSON.stringify(result))
        },
        (error) => {
          console.log(error)
        }
      );
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Recipe:
          <br></br>
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default CreateRecipeComponent;
