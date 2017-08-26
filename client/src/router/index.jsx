import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RouteAuthorized from './matchauth';

import About from './../components/about';
import Home from './../components/home';
import Photos from './../components/photos';
// import Search from './../components/search/search-wizard';
import Signin from './../components/auth/signin';
import Signup from './../components/auth/signup';
import Signout from './../components/auth/signout';
import UserProfile from './../components/auth/user-profile';
import UserWizard from './../components/auth/user-wizard';

const router = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    {/* <Route path="/search" component={Search} /> */}
    <RouteAuthorized exact path="/user-photos" component={Photos} />
    <RouteAuthorized exact path="/user-profile" component={UserProfile} />
    <RouteAuthorized exact path="/user-wizard" component={UserWizard} />
    <RouteAuthorized exact path="/signout" component={Signout} />
    <Route path="/signin" component={Signin} />
    <Route path="/signup" component={Signup} />
    <Route path="/" component={Home} />
  </Switch>
);

export default router;
