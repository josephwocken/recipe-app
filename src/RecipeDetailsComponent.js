import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function usePageViews() {
  let location = useLocation();
  let path = location.pathname;
  let recipeId = path.split("/")[2];
  console.log("path: " + path + ", recipe id: " + recipeId);
  return recipeId;
}

//TODO: this is hitting the api at least 5 times
export default function RecipeDetailsComponent(props) {
  const [recipe, setRecipe] = useState('');
  const [fetchAttempts, setFetchAttemps] = useState(0);
  const [show, setShow] = useState(false);
  const [recipeContent, setRecipeContent] = useState('')

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
  }

  if (recipe) {
    return (
      <div>
        <h2>{recipe.name}</h2>
        <br></br>
        {recipe.content}
        <br></br>
        <Button variant="primary" type="submit" onClick={handleShow}>
          Edit
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{recipe.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/*
            TODO: handle submitting the updated recipe to the api
            */}
            <Form>
              <Form.Group controlId="updateRecipeForm.ControlTextarea1">
                <Form.Control
                  as="textarea" defaultValue={recipe.content} rows="1"
                  onChange={event => setRecipeContent(event.target.value)}
                  body={recipe.content}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  } else {
    return (
      <div>
        Loading...
      </div>
    )
  }
}
