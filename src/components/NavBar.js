import React, {useState} from 'react';
import {Link, navigate} from '@reach/router';
import axios from 'axios';

const NavBar = ({currentUser, updateUser}) => {
  const [isActive, setIsActive] = useState('');

  // update `is-active` state for use with dropdown menu on mobile devices
  const hamburgerHelper = e =>
    isActive ? setIsActive('') : setIsActive('is-active');

  // log out function
  const logout = e => {
    e.preventDefault();

    axios
      .post('/user/logout')
      .then(response => {
        if (response.status === 200) {
          updateUser({
            loggedIn: false,
            username: null,
            _id: null,
            hardinessZone: null,
            email: null,
          });
        }
      })
      .then(() => navigate('/'))
      .catch(err => console.log(err));
  };

  return (
    <nav
      className='navbar is-primary is-transparent is-fixed-top'
      role='navigation'
      aria-label='main navigation'>
      <div className='navbar-brand'>
        <a className='navbar-item no-tb-padding' href='/'>
          <span id='plantr' className='is-size-1'>
            plantr
          </span>
        </a>

        <div
          role='button'
          className={`navbar-burger burger ${isActive}`}
          aria-label='menu'
          aria-expanded='false'
          onClick={hamburgerHelper}>
          <span aria-hidden='true' />
          <span aria-hidden='true' />
          <span aria-hidden='true' />
        </div>
      </div>

      <div className={`navbar-menu is-centered ${isActive}`}>
        <div className='navbar-start'>
          <Link to='/about' className='navbar-item'>
            About
          </Link>

          {currentUser.loggedIn && (
            <Link to='/your-garden' className='navbar-item'>
              <span role='img' aria-label='sunflower emoji'>
                🌻
              </span>{' '}
              <span>Your Garden</span>
            </Link>
          )}
        </div>
        <div className='navbar-end'>
          {currentUser.loggedIn && (
            <Link to={`/profile/${currentUser._id}`} className='navbar-item'>
              <span>{`${currentUser.username}`} </span>
              <span className='icon'>
                <i className='fas fa-user is-size-5' />
              </span>
            </Link>
          )}
          <div className='navbar-item'>
            <div className='buttons'>
              {!currentUser.loggedIn && (
                <Link to='/signup' className='button is-primary no-shadow'>
                  <strong>Sign up</strong>
                </Link>
              )}
              {!currentUser.loggedIn && (
                <Link to='/login' className='button is-light'>
                  Log in
                </Link>
              )}
              {currentUser.loggedIn && (
                <Link to='/' className='button is-light' onClick={logout}>
                  Log out
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
