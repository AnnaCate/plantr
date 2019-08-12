import React from 'react';
import {Router} from '@reach/router';

// import components
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import SignupForm from './components/SignUp';
// About
// PlantDetails
// YourGarden

const App = () => {
  return (
    <div>
      <NavBar />
      <Router>
        <HomePage path='/' />
        <SignupForm path='/signup' />
      </Router>
    </div>
  );
};

export default App;
