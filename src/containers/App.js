import React, {useState, useEffect} from 'react';
import {Router, Redirect} from '@reach/router';
import axios from 'axios';

// import components
import NavBar from '../components/NavBar';
import HomePage from './HomePage';
import SignupForm from './SignUp';
import LogInForm from './LogIn';
import About from './About';
// PlantDetails
import Garden from './Garden';
import Footer from '../components/Footer';

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    loggedIn: false,
    username: null,
    _id: null,
  });

  // get logged in user when component mounts
  useEffect(() => getUser(), []);

  const updateUser = userObject => setCurrentUser(userObject);

  const getUser = () => {
    axios.get('/user/').then(response => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ');
        setCurrentUser({
          loggedIn: true,
          username: response.data.user.username,
          _id: response.data.user._id,
        });
      } else {
        console.log('Get user: no user');
        setCurrentUser({loggedIn: false, username: null, _id: null});
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
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default App;
