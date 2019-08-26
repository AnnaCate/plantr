import React, {useState} from 'react';
import {navigate} from '@reach/router';
import axios from 'axios';

const LogInForm = props => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const checkCompletion = () => {
    if (user.username === '' || user.password === '') {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // POST request to server
    axios
      .post('/user/login', {
        username: user.username,
        password: user.password,
      })
      .then(response => {
        if (response.status === 200) {
          props.updateUser({
            loggedIn: true,
            username: response.data.username,
            _id: response.data._id,
            hardinessZone: response.data.hardinessZone,
          });
          navigate('/your-garden');
        }
      })
      .catch(err => {
        console.log('login error: ');
        console.log(err);
      });
  };

  const handleCancel = e => {
    setUser({
      username: '',
      password: '',
    });
    navigate('/');
  };

  return (
    <section className='section'>
      <div className='columns'>
        {/* empty column to allow form to be centered on page */}
        <div className='column' />

        {/* Sign up form column */}
        <div className='column is-one-third'>
          <h2 className='title has-text-centered'>Log In</h2>

          <div className='field'>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='username'
                placeholder='username'
                value={user.username || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <input
                className='input'
                type='password'
                name='password'
                placeholder='password'
                value={user.password || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='field is-grouped is-grouped-centered'>
            <div className='control'>
              <button
                className='button is-primary'
                onClick={handleSubmit}
                disabled={checkCompletion()}>
                Log In
              </button>
            </div>
            <div className='control'>
              <button className='button is-text' onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* empty column to allow form to be centered on page */}
        <div className='column' />
      </div>
    </section>
  );
};

export default LogInForm;
