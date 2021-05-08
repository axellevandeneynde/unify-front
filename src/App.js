import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import HomePage from './pages/home/home.page';
import Footer from './components/footer';
import Navigation from "./components/navigation/navigation";
import Search from "./components/search/search";

function App() {
  return (<Router>
    <Navigation></Navigation>
    <Switch>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/home">
        <HomePage />
      </Route>
      <Route path="/">
        <Redirect to='/home' />
      </Route>
    </Switch>
    <Footer></Footer>
  </Router>);
}

export default App;
