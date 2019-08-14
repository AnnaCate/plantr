import React, {useState, useEffect} from 'react';
import {Router} from '@reach/router';
import axios from 'axios';

// import components
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import SignupForm from './components/SignUp';
import LogInForm from './components/LogIn';
// About
// PlantDetails
// YourGarden

const App = () => {
  const [currentUser, setCurrentUser] = useState({loggedIn: false, username: null});

  useEffect(() => getUser(), []);

  const updateUser = userObject => setCurrentUser(userObject);

  const getUser = () => {
    axios.get('/user/').then(response => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ');
        setCurrentUser({loggedIn: true, username: response.data.user.username});
      } else {
        console.log('Get user: no user');
        setCurrentUser({loggedIn: false, username: null});
      }
    });
  };

  return (
    <div>
      <NavBar updateUser={updateUser} currentUser={currentUser} />
      {currentUser.loggedIn && <p>Join the party, {currentUser.username}!</p>}
      <Router>
        <HomePage path='/' />
        <SignupForm path='/signup' />
        <LogInForm path='/login' updateUser={updateUser} />
      </Router>
    </div>
  );
};

export default App;
