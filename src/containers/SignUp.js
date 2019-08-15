import React, {useState} from 'react';
import {navigate} from '@reach/router';
import axios from 'axios';
import emailValidator from 'email-validator';

/** 👁REFACTOR OPPORTUNITIES
 * Put validation functions in a separate file
 * Consolidate show/hide functions somehow
 */

const SignupForm = props => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [emailInUse, setEmailInUse] = useState(false); // will set in axios call
  const [usernameAvailable, setUsernameAvailable] = useState(true); // will set in axios call
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const validateEmail = () => {
    if (emailValidator.validate(user.email)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const showEmailError = () => {
    return emailIsValid ? 'hidden' : '';
  };

  const showEmailInUseError = () => {
    return emailInUse ? '' : 'hidden';
  };

  const showUsernameError = () => {
    return usernameAvailable ? 'hidden' : '';
  };

  const validatePassword = () => {
    if (user.password !== user.confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  const showPasswordError = () => {
    return passwordsMatch ? 'hidden' : '';
  };

  const checkCompletion = () => {
    if (
      user.email === '' ||
      user.username === '' ||
      user.password === '' ||
      user.confirmPassword === '' ||
      emailInUse ||
      !emailIsValid ||
      !usernameAvailable ||
      !passwordsMatch
    ) {
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

    console.log('SignupForm username: ');
    console.log(user.username);
    console.log(user.password);
    console.log(user.confirmPassword);

    // POST request to server
    axios
      .post('/user/', {
        username: user.username,
        password: user.password,
        email: user.email,
      })
      .then(response => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log('successful signup');
          navigate('/login');
        } else {
          console.log('Username or email already in use');
        }
      })
      .catch(err => {
        console.log('Sign up server error: ');
        console.log(err);
      });
  };

  const handleCancel = e => {
    setUser({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
    setEmailInUse(false);
    setEmailIsValid(true);
    setPasswordsMatch(true);
    setUsernameAvailable(true);

    navigate('/');
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
                type='email'
                name='email'
                value={user.email || ''}
                onChange={handleChange}
                onBlur={validateEmail}
              />
            </div>
            <p className={`help is-danger ${showEmailError()}`}>
              Please enter a valid email address.
            </p>
            <p className={`help is-danger ${showEmailInUseError()}`}>
              Email address is already in use.
            </p>
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
            <p className={`help is-danger ${showUsernameError()}`}>
              Username is already taken.
            </p>
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
                onBlur={validatePassword}
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
                onBlur={validatePassword}
              />
            </div>
            <p className={`help is-danger ${showPasswordError()}`}>
              Passwords should match.
            </p>
          </div>

          <div className='field is-grouped is-grouped-centered'>
            <div className='control'>
              <button
                className='button is-primary'
                onClick={handleSubmit}
                disabled={checkCompletion()}>
                Submit
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

export default SignupForm;
