import React, {useEffect} from 'react';
import {redirectTo, Link} from '@reach/router';

const Garden = props => {
  useEffect(() => {
    if (!props.currentUser.loggedIn) {
      redirectTo('/login');
    }
  }, [props.currentUser.loggedIn]);

  return (
    <section className='section'>
      <div className='margin-bottom'>There's nothing here!</div>
      <div>
        <Link to='/' className='button is-primary'>
          Search plants
        </Link>
      </div>
    </section>
  );
};

export default Garden;
