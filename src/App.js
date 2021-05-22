import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { RecoilRoot } from 'recoil';

import HomePage from './pages/home/home.page';
import Footer from './components/footer';
import Navigation from "./components/navigation/navigation";
import Search from "./components/search/search";
import RelatedPage from './pages/related.page';
import CreateFeedPage from './pages/create-feed/create-feed.page';
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Auth0Provider
          domain="dev--gys6ql4.eu.auth0.com"
          clientId="KueLxjrfFOXb68rCrc6uUsk08Py3pTAP"
          redirectUri={window.location.origin + '/home'}
          useRefreshTokens={true}
          cacheLocation="localstorage"
          audience="https://dev--gys6ql4.eu.auth0.com/api/v2/"
          scope="read:current_user update:current_user_metadata"
        >
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
        </Auth0Provider>
      </Router>
    </RecoilRoot>
  );
}

export default App;
