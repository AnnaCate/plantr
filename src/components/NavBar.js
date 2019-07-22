import React, {useState} from 'react';

const NavBar = props => {
  const [isActive, setIsActive] = useState('');

  // update `is-active` state for use with dropdown menu on mobile devices
  const hamburgerHelper = e =>
    isActive ? setIsActive('') : setIsActive('is-active');

  return (
    <nav
      className='navbar is-primary'
      role='navigation'
      aria-label='main navigation'>
      <div className='navbar-brand'>
        <a className='navbar-item is-size-3' href='/'>
          🍉
          <span id='flora-files'>Flora Files</span>
        </a>

        <a
          role='button'
          className={`navbar-burger burger ${isActive}`}
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
          onClick={hamburgerHelper}>
          <span aria-hidden='true' />
          <span aria-hidden='true' />
          <span aria-hidden='true' />
        </a>
      </div>

      <div className={`navbar-menu is-centered ${isActive}`}>
        <div className='navbar-start'>
          <a id='home-link' className='navbar-item'>
            Home
          </a>

          <a className='navbar-item'>About</a>
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <a className='button is-primary'>
                <strong>Sign up</strong>
              </a>
              <a className='button is-light'>Log in</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
