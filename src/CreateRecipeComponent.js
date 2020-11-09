import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import ImageUploader from 'react-images-upload';

class CreateRecipeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      recipeContent: '',
      isRecipeSubmitted: false,
      password: '',
      pictures: []
    };

    this.handleRecipeContentChange = this.handleRecipeContentChange.bind(this);
    this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handlePictureSubmit = this.handlePictureSubmit.bind(this);
  }

  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
  }

  //TODO: handle deleting image attachments
  // onDeleteImage() {
  //   this.setState({
  //
  //   });
  // }

  handleRecipeContentChange(event) {
    this.setState({recipeContent: event.target.value});
  }

  handleRecipeNameChange(event) {
    this.setState({recipeName: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handlePictureSubmit(recipeId) {
    const pictures = this.state.pictures;
    const formData = new FormData()
    formData.append('image', pictures[0])
    console.log("form data: " + formData);
    console.log("recipe id: " + recipeId);
    //TODO: post this imave to the api
    var recipesUrl = 'http://localhost:5050';
    if (process.env.NODE_ENV === 'production') {
      recipesUrl = 'https://www.sophiesrecipes.com:5050';
    }
    fetch(recipesUrl + '/images/' + recipeId, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const recipeName = this.state.recipeName;
    const recipeContent = this.state.recipeContent;
    const password = this.state.password;
    const recipe = {
      name: recipeName,
      content: recipeContent,
      password: password
    }
    console.log("Recipe to upload: " + JSON.stringify(recipe));
    var recipesUrl = 'http://localhost:5050';
    if (process.env.NODE_ENV === 'production') {
      recipesUrl = 'https://www.sophiesrecipes.com:5050';
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
        return response.json()
      })
      .then(data => {
        console.log("created recipe json: " + JSON.stringify(data))
        let recipeId = data.recipeId
        this.handlePictureSubmit(recipeId);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Password did not work.');
      });
    this.setState({isRecipeSubmitted: true})
  }

  render() {
    const { isRecipeSubmitted, pictures } = this.state;
    console.log("pictures: " + pictures);
     return (
       <Container>
         <br></br>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="createRecipeForm.ControlTextarea1">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control as="textarea" rows="1" onChange={this.handleRecipeNameChange} />
            </Form.Group>
            <Form.Group controlId="createRecipeForm.ControlTextarea2">
              <Form.Label>Recipe Contents</Form.Label>
              <Form.Control as="textarea" rows="5" onChange={this.handleRecipeContentChange} />
            </Form.Group>
            <Form.Group controlId="createRecipeForm.ControlTextarea3">
              <Form.Label>Recipe Pictures</Form.Label>
                <ImageUploader
                  withIcon={true}
                  buttonText='Choose images'
                  withPreview={true}
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                />
            </Form.Group>
            <Form.Group controlId="createRecipeForm.ControlTextarea4">
              <Form.Label>Password</Form.Label>
              <Form.Control as="textarea" rows="1" onChange={this.handlePasswordChange} />
            </Form.Group>
            {isRecipeSubmitted
              ? <Button variant="primary" type="submit" disabled>Submit</Button>
              : <Button variant="primary" type="submit">Submit</Button>
            }
          </Form>
        </Container>
      )
  }
}

export default CreateRecipeComponent;
