import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

class ListRecipesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      recipes: [],
      recipeDeleted: false
    };
    this.fetchRecipes = this.fetchRecipes.bind(this);
  }

  fetchRecipes() {
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

  componentDidMount() {
    this.fetchRecipes();
  }

  componentDidUpdate() {
    this.fetchRecipes();
  }

  render() {
    const { error, isLoaded, recipes, recipeDeleted } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      recipes.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
      return (
        <div>
          <ListGroup>
            {recipes.map(recipe => (
              <ListGroup.Item key={recipe.recipeId}>
                <Container>
                  <Row>
                    <Col xs={6}>
                      <Link to={"/recipes/" + recipe.recipeId}>
                        {recipe.name}
                      </Link>
                    </Col>
                  </Row>
                </Container>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      );
    }
  }
}

export default ListRecipesComponent;
