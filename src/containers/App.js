import React, {useState, useEffect} from 'react';
import {Router, Redirect} from '@reach/router';
import axios from 'axios';

// import components
import NavBar from '../components/NavBar';
import HomePage from './HomePage';
import SignupForm from './SignUp';
import LogInForm from './LogIn';
import About from './About';
import PlantDetails from './PlantDetails';
import Garden from './Garden';
import Footer from '../components/Footer';

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    loggedIn: false,
    username: null,
    _id: null,
    hardinessZone: null,
  });

  // get logged in user when component mounts
  useEffect(() => getUser(), []);

  const updateUser = userObject => setCurrentUser(userObject);

  const getUser = () => {
    axios.get('/user/').then(response => {
      console.log(response);
      if (response.data.user) {
        setCurrentUser({
          loggedIn: true,
          username: response.data.user.username,
          _id: response.data.user._id,
          hardinessZone: response.data.user.hardinessZone,
        });
      } else {
        setCurrentUser({
          loggedIn: false,
          username: null,
          _id: null,
          hardinessZone: null,
        });
      }
    });
  };

  // function to redirect user to log in if they try to access
  // a protected component
  const ProtectedRoute = ({component: Component, ...rest}) =>
    currentUser.loggedIn ? (
      <Component {...rest} />
    ) : (
      <Redirect from='' to='/login' noThrow />
    );

  // function to redirect user to homepage if they try to access
  // the login or signup pages while already logged in
  const RedirectRoute = ({component: Component, ...rest}) =>
    !currentUser.loggedIn ? (
      <Component {...rest} />
    ) : (
      <Redirect from='' to='/' noThrow />
    );

  return (
    <div id='site'>
      <NavBar updateUser={updateUser} currentUser={currentUser} />

      <div id='site-content'>
        <Router>
          <HomePage path='/' currentUser={currentUser} />
          <About path='/about' />
          <RedirectRoute component={SignupForm} path='/signup' />
          <RedirectRoute
            component={LogInForm}
            path='/login'
            updateUser={updateUser}
          />
          <ProtectedRoute
            component={Garden}
            path='/your-garden'
            currentUser={currentUser}
          />
          <ProtectedRoute
            component={PlantDetails}
            path='/your-garden/:_id'
            currentUser={currentUser}
          />
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default App;
