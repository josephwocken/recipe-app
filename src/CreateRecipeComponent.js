import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import ImageUploader from 'react-images-upload';
import ReactDOM from 'react-dom';
// import './CreateRecipeComponent.css'; also styles for details page. this must be global.
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

class CreateRecipeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      recipeContent: '',
      isRecipeSubmitted: false,
      password: '',
      pictures: [],
      editorState: EditorState.createEmpty()
    };

    this.onChange = editorState => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
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
    if (pictures.length === 0) {
      console.log("Not uploading image because it was not provided.");
      return Promise.resolve();
    }
    const formData = new FormData()
    // this has to match val uploadedImageFile: UploadedFile = form.file("image")
    // in the ratpack server
    formData.append('image', pictures[0])
    console.log("form data: " + formData);
    console.log("recipe id: " + recipeId);
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
    const contentState = this.state.editorState.getCurrentContent();
    const rawState = convertToRaw(contentState);
    const recipe = {
      name: recipeName,
      content: JSON.stringify(rawState),
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
        alert('Failed to create recipe. Please try again.');
      });
    this.setState({isRecipeSubmitted: true})
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  render() {
    const { isRecipeSubmitted, pictures } = this.state;
     return (
       <Container>
         <br></br>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="createRecipeForm.ControlTextarea1">
              <Form.Control as="textarea" rows="1" placeholder="Name" onChange={this.handleRecipeNameChange} />
            </Form.Group>
            <Form.Group controlId="createRecipeForm.ControlTextarea2">
              <Editor
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                placeholder='Recipe'
              />
              {/* <Form.Control as="textarea" rows="5" placeholder="Contents" onChange={this.handleRecipeContentChange} /> */}
            </Form.Group>
            <Form.Group controlId="createRecipeForm.ControlTextarea3">
                <ImageUploader
                  withIcon={true}
                  buttonText='Choose image'
                  withPreview={true}
                  onChange={this.onDrop}
                  singleImage={true}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                />
            </Form.Group>
            <Form.Group controlId="createRecipeForm.ControlTextarea4">
              <Form.Control type="text" placeholder="Password" onChange={this.handlePasswordChange} />
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
