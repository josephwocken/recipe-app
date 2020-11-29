import React from "react";
import ListRecipesComponent from './ListRecipesComponent';
import CreateRecipeComponent from './CreateRecipeComponent';
import RecipeDetailsComponent from './RecipeDetailsComponent';
import HealthComponent from './HealthComponent';
import Nav from 'react-bootstrap/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class HomeComponent extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link><Link to="/listrecipes">List Recipes</Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link><Link to="/createrecipe">Create Recipe</Link></Nav.Link>
            </Nav.Item>
          </Nav>

          <Switch>
            <Route path="/listrecipes">
              <ListRecipesComponent />
            </Route>
            <Route path="/createrecipe">
              <CreateRecipeComponent />
            </Route>
            <Route path="/recipes/:recipeId" children={<RecipeDetailsComponent />} />
            <Route path="/health">
              <HealthComponent />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default HomeComponent;
