import React, {useState} from 'react';
import {Link} from '@reach/router';
import axios from 'axios';

const NavBar = props => {
  const [isActive, setIsActive] = useState('');

  // update `is-active` state for use with dropdown menu on mobile devices
  const hamburgerHelper = e =>
    isActive ? setIsActive('') : setIsActive('is-active');

  const logout = e => {
    e.preventDefault();

    console.log('logging out');
    axios
      .post('/user/logout')
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          props.updateUser({
            loggedIn: false,
            username: null,
          });
        }
      })
      .catch(err => console.log('Logout error'));
  };

  return (
    <nav
      className='navbar is-primary'
      role='navigation'
      aria-label='main navigation'>
      <div className='navbar-brand'>
        <a className='navbar-item is-size-3' href='/'>
          <span role='img' aria-label='watermelon emoji'>
            🍉
          </span>
          <span id='flora-files'>Flora Files</span>
        </a>

        <a
          role='button'
          className={`navbar-burger burger ${isActive}`}
          aria-label='menu'
          aria-expanded='false'
          onClick={hamburgerHelper}>
          <span aria-hidden='true' />
          <span aria-hidden='true' />
          <span aria-hidden='true' />
        </a>
      </div>

      <div className={`navbar-menu is-centered ${isActive}`}>
        <div className='navbar-start'>
          {/* <Link to='/' className='navbar-item'>
            Home
          </Link> */}

          {/* <a className='navbar-item'>About</a> */}
        </div>

        <div className='navbar-end'>
          {props.currentUser.loggedIn && (
            <Link to='/your-garden' className='navbar-item'>
              <span role='img' aria-label='sunflower emoji'>
                🌻
              </span>
              <strong>Your Garden</strong>
            </Link>
          )}
          <div className='navbar-item'>
            <div className='buttons'>
              {!props.currentUser.loggedIn && (
                <Link to='/signup' className='button is-primary'>
                  <strong>Sign up</strong>
                </Link>
              )}
              {!props.currentUser.loggedIn && (
                <Link to='/login' className='button is-light'>
                  Log in
                </Link>
              )}
              {props.currentUser.loggedIn && (
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
