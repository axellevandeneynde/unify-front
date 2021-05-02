import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import HomePage from './pages/home/home.page';
import Footer from './components/footer';
import Navigation from "./components/navigation/navigation";

function App() {
  return (<Router>
    <div className="grid body-padding">
      <Navigation></Navigation>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer></Footer>
    </div>
  </Router>);
}

export default App;
