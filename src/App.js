import React, { useState, useCallback, useContext, useEffect } from 'react';
import defautclasses from "./APIFetcher/styles/default.module.css";
// import "./APIFetcher/styles/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.min.js";

import prettify from "./APIFetcher/styles/prettify.module.css";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './Places/users/pages/Users';
import Auth from './Places/users/pages/Auth';
import { AuthContext } from './Places/shared/context/auth-context';
import UserPlaces from './Places/places/pages/UserPlaces';
import MainNavigation from './Places/shared/components/Navigation/MainNavigation';
import NewPlace from './Places/places/pages/NewPlace';
import EditPlace from './Places/places/pages/EditPlace';
import Place from './Places/places/pages/Place';
import Places from './Places/places/pages/Places';
import { Container } from 'react-bootstrap';
// import NewPlace from './Places/places/pages/NewPlace';
// import UserPlaces from './Places/places/pages/UserPlaces';
// import UpdatePlace from './Places/places/pages/UpdatePlace';
// import Auth from './Places/user/pages/Auth';
// import MainNavigation from './Places/shared/components/Navigation/MainNavigation';
// import { AuthContext } from './Places/shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setIsToken] = useState();
  let logoutTimer;
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  /*if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }*/

  /*return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );*/
  const authctx=useContext(AuthContext)
  useEffect(()=>{
    if(authctx.token && localStorage.getItem("tokenExpirationTime")){
      const remainingTime=new Date(localStorage.getItem("tokenExpirationTime")).getTime()-new Date().getTime();
      if(remainingTime < 0){
        authctx.logout()
      }else{
        logoutTimer=setTimeout(authctx.logout, remainingTime)
      }
    }else{
      clearTimeout(logoutTimer)
    }
  }, [authctx.token, authctx.isLoggedIn])
  if(!authctx.isLoggedIn){
    routes=<Switch>
      <Route path="/auth"><Auth /></Route>
    </Switch>
  }
  if(authctx.isLoggedIn){
    routes=<Switch>
      <Route path="/new-place"><NewPlace /></Route>
      <Route path="/places/:pid/edit-place" exact><EditPlace /></Route>
    </Switch>
  }
  console.log(authctx.isLoggedIn)
  return (<div className="App">
  <div className="page-header">
      <h1>Explaination of MERN Stack Development</h1>
  </div>
  <body>
    <Router>
      <Container  
      className={`panel-body container ${defautclasses['form']}`}>
      <MainNavigation />
      <Switch>
        <Route path="/" exact><Redirect to="/users" /></Route>
        <Route path="/users" exact><Users /></Route>
        <Route path="/users/:userId" exact><UserPlaces /></Route>
        <Route path="/places/:pid" exact><Place /></Route>
        <Route path="/places" exact><Places /></Route>
      </Switch>
      {routes}
      <br/><br/>
      <div className="panel-heading">
        <strong><h2>PLACES</h2></strong>
      </div>
      <div className="panel-body">
        <h3>Great people make places great.</h3>
      </div>
      </Container>
    </Router>
  </body>
</div>)
};

export default App;
