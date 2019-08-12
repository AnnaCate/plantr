import React, {useState} from 'react';
import {navigate} from '@reach/router';
import axios from 'axios';

const SignupForm = props => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log('SignupForm username: ');
    console.log(user.username);
    console.log(user.password);
    console.log(user.confirmPassword);

    //request to server here
    // axios
    //   .post('http://localhost:8080/', {
    //     username: user.username,
    //     password: user.password,
    //     email: user.email,
    //   })

    fetch('/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        // if (response) {
        //   console.log('successful signup');
        // navigate('/login');
        // } else {
        //   console.log('Signup error');
        // }
      })
      .catch(err => {
        console.log('Sign up server error: ');
        console.log(err);
      });
  };

  const handleCancel = e => {
    console.log('cancelled');
  };

  return (
    <section className='section'>
      <div className='columns'>
        {/* empty column to allow form to be centered on page */}
        <div className='column' />

        {/* Sign up form column */}
        <div className='column is-one-third'>
          <h2 className='title has-text-centered'>Sign Up</h2>

          <div className='field'>
            <div className='control'>
              <label className='label'>Email:</label>
              <input
                className='input'
                type='text'
                name='email'
                value={user.email || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <label className='label'>Username:</label>
              <input
                className='input'
                type='text'
                name='username'
                value={user.username || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <label className='label'>Password:</label>
              <input
                className='input'
                type='password'
                name='password'
                value={user.password || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <label className='label'>Confirm Password:</label>
              <input
                className='input'
                type='password'
                name='confirmPassword'
                value={user.confirmPassword || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='field is-grouped is-grouped-centered'>
            <div className='control'>
              <a className='button is-primary' onClick={handleSubmit}>
                Submit
              </a>
            </div>
            <div className='control'>
              <a className='button is-text' onClick={handleCancel}>
                Cancel
              </a>
            </div>
          </div>
        </div>

        {/* empty column to allow form to be centered on page */}
        <div className='column' />
      </div>
    </section>
  );
};

export default SignupForm;
