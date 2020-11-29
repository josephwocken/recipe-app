import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import './RecipeDetailsComponent.css';

function handleSubmit(updatedRecipeContent, updatedRecipeName, password, recipeId) {
  const recipe = {
    recipeId: recipeId,
    name: updatedRecipeName,
    content: updatedRecipeContent,
    password: password
  }
  var recipesUrl = 'http://localhost:5050';
  if (process.env.NODE_ENV === 'production') {
    recipesUrl = 'https://www.sophiesrecipes.com:5050';
  }
  fetch(recipesUrl + "/recipes/" + recipeId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  })
    .then(response => {
      if (!response.ok) {
        console.log(`Error with response: ${response.statusText}`)
        throw new Error('Network response was not ok.');
      }
    })
    .catch(error => {
      console.error('There has been a problem with the update operation:', error);
      alert('Password did not work.');
    });
}

//TODO: this is hitting the api at least 5 times
export default function RecipeDetailsComponent() {
  const [recipe, setRecipe] = useState('');
  const [show, setShow] = useState(false);
  const [recipeName, setRecipeName] = useState('');
  const [recipeContent, setRecipeContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [recipeHasImage, setRecipeHasImage] = useState(true);
  const [password, setPassword] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { recipeId } = useParams();

  var recipesUrl = 'http://localhost:5050'
  if (process.env.NODE_ENV === 'production') {
    recipesUrl = 'https://www.sophiesrecipes.com:5050'
  }

  useEffect(() => {
    if (recipe === '') {
        fetch(recipesUrl + "/recipes/" + recipeId)
            .then(res => res.json())
            .then(
              (result) => {
                setRecipe(result);
                setRecipeName(result.name)
                console.log("result: " + JSON.stringify(result));
              },
              (error) => {
                console.log("error: " + error);
              }
            )
    }
    if (imageUrl === '' && recipeHasImage) {
      fetch(recipesUrl + '/images/' + recipeId)
              .then(response => response.blob())
              .then(
                (images) => {
                  //create a local URL for that image and print it
                  let imageUrl = URL.createObjectURL(images);
                  console.log(imageUrl);
                  setImageUrl(imageUrl);
              },
              (error) => {
                console.error("Image for recipe not found", error);
                setRecipeHasImage(false);
              }
            )
    }
  });

  if (recipe && imageUrl) {
    return (
      <Container>
        <br></br>
        <h2>{recipe.name}</h2>
        <br></br>
        <p className="RecipeDetails">{recipe.content}</p>
        <Image src={imageUrl} />
        <br></br>

        <Button variant="primary" type="submit" onClick={handleShow}>
          Edit
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Form.Group controlId="updateRecipeForm.ControlTextarea1">
                <Form.Control as="textarea" defaultValue={recipe.name} onChange={event => setRecipeName(event.target.value)} />
              </Form.Group>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="updateRecipeForm.ControlTextarea2">
                <Form.Control
                  as="textarea" defaultValue={recipe.content} rows="10"
                  onChange={event => setRecipeContent(event.target.value)}
                />
                <Form.Group controlId="updateRecipeForm.ControlTextarea3">
                  <Form.Control type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} />
                </Form.Group>
                <Button type="submit" onClick={() => handleSubmit(recipeContent, recipeName, password, recipeId)}>
                  Save Changes
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    )
  } else {
    return (
      <div>
        Loading...
      </div>
    )
  }
}
