import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import './RecipeDetailsComponent.css'

function usePageViews() {
  let location = useLocation();
  let path = location.pathname;
  let recipeId = path.split("/")[2];
  console.log("path: " + path + ", recipe id: " + recipeId);
  return recipeId;
}

function handleSubmit(updatedRecipeContent, recipeId, show) {
  console.log("show? " + show)
  //this isn't working
  if (show === true) {
    return
  }
  const recipe = {
    content: updatedRecipeContent
  }
  console.log("Recipe to upload: " + JSON.stringify(recipe));
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
        throw new Error('Network response was not ok');
      }
    })
    .catch(error => {
      console.error('There has been a problem with the update operation:', error);
      // alert('Password did not work.');
    });
}

//TODO: this is hitting the api at least 5 times
export default function RecipeDetailsComponent(props) {
  const [recipe, setRecipe] = useState('');
  const [fetchAttempts, setFetchAttemps] = useState(0);
  const [show, setShow] = useState(false);
  const [recipeContent, setRecipeContent] = useState('')
  const [imageUrl, setImageUrl] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

    fetch(recipesUrl + '/images/' + id)
            .then(response => response.blob())
            .then(images => {
                // Then create a local URL for that image and print it
                let imageUrl = URL.createObjectURL(images);
                console.log(imageUrl);
                setImageUrl(imageUrl);
            })
  }

  if (recipe && imageUrl) {
    return (
      <Container>
        <br></br>
        <h2>{recipe.name}</h2>
        <br></br>
        <p className="RecipeDetails">{recipe.content}</p>
        <img src={imageUrl}></img>
        <br></br>
        {/*
        <Button variant="primary" type="submit" onClick={handleShow}>
          Edit
        </Button>
        */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{recipe.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/*
            TODO: handle submitting the updated recipe to the api
            TODO: form is being submitted even without showing modal
            */}
            <Form>
              <Form.Group controlId="updateRecipeForm.ControlTextarea1">
                <Form.Control
                  as="textarea" defaultValue={recipe.content} rows="1"
                  onChange={event => setRecipeContent(event.target.value)}
                  body={recipe.content}
                />
                <Button variant="primary" type="submit">
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
