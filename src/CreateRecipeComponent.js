import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class CreateRecipeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      recipeContent: '',
      isRecipeSubmitted: false
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
    this.setState({isRecipeSubmitted: true})
    event.preventDefault();
  }

  render() {
    const { isRecipeSubmitted } = this.state;
      if (!isRecipeSubmitted) {
        return (
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="createRecipeForm.ControlTextarea1">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control as="textarea" rows="1" onChange={this.handleRecipeNameChange} />
            </Form.Group>
            <Form.Group controlId="crateRecipeForm.ControlTextarea2">
              <Form.Label>Recipe Contents</Form.Label>
              <Form.Control as="textarea" rows="5" onChange={this.handleRecipeContentChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )
      } else {
        return (
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="createRecipeForm.ControlTextarea1">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control as="textarea" rows="1" onChange={this.handleRecipeNameChange} />
            </Form.Group>
            <Form.Group controlId="crateRecipeForm.ControlTextarea2">
              <Form.Label>Recipe Contents</Form.Label>
              <Form.Control as="textarea" rows="5" onChange={this.handleRecipeContentChange} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled>
              Submit
            </Button>
          </Form>
        )
      }
  }
}

export default CreateRecipeComponent;
