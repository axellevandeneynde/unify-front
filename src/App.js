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
import RelatedPage from './pages/related.page';
import CreateFeedPage from './pages/create-feed/create-feed.page';

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
      <Route path="/related/:searchQuery" component={RelatedPage} />
      <Route path="/create-feed">
        <CreateFeedPage />
      </Route>
      <Route path="/">
        <Redirect to='/home' />
      </Route>
    </Switch>
    <Footer></Footer>
  </Router>);
}

export default App;
