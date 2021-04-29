import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import HomePage from './pages/home/home.page';

function App() {
  return (<Router>
    {/* add navigation here */}
    <Switch>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  </Router>);
}

export default App;
