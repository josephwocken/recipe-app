import React from "react";
import ListRecipesComponent from './ListRecipesComponent';
import CreateRecipeComponent from './CreateRecipeComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/listrecipes">List Recipes</Link>
              </li>
              <li>
                <Link to="/createrecipe">Create Recipe</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/listrecipes">
              <ListRecipesComponent />
            </Route>
            <Route path="/createrecipe">
              <CreateRecipeComponent />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default HomeComponent;
