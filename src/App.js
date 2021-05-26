import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProtectedRoute from './auth/Protected-route';

import { RecoilRoot } from 'recoil';

import HomePage from './pages/home/home.page';
import Footer from './components/footer';
import Navigation from "./components/navigation/navigation";
import Search from "./components/search/search";
import RelatedPage from './pages/related.page';
import CreateFeedPage from './pages/create-feed/create-feed.page';
import UserFeedPage from './pages/user-feed.page';
import { Auth0Provider } from "@auth0/auth0-react";
import BookmarksPage from "./pages/bookmarks/bookmarks.page";

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
            <ProtectedRoute path="/create-feed" component={CreateFeedPage} />
            <Route path="/user-feed/:userFeedName" component={UserFeedPage} />
            <ProtectedRoute path="/bookmarks" component={BookmarksPage} />
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
