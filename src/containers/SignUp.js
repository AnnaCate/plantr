import React, {useState} from 'react';
import {navigate} from '@reach/router';
import axios from 'axios';
import emailValidator from 'email-validator';

const SignupForm = () => {
  // new user state
  const [user, setUser] = useState({
    email: '',
    hardinessZone: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [isActive, setIsActive] = useState(false);

  // validation states
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  const [hardinessZoneIsValid, setHardinessZoneIsValid] = useState(true);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [passwordLengthOk, setPasswordLengthOk] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  /**
   * Validate each input field
   * @param {Event} e onBlur event
   */
  const validate = e => {
    switch (e.target.name) {
      case 'email':
        setEmailIsValid(emailValidator.validate(user.email));
        setEmailAvailable(true);
        break;
      case 'hardinessZone':
        setHardinessZoneIsValid(user.hardinessZone >= 1 && user.hardinessZone <= 13);
        break;
      case 'username':
        setUsernameAvailable(true);
        break;
      case 'password':
      case 'confirmPassword':
        setPasswordsMatch(user.password === user.confirmPassword);
        setPasswordLengthOk(user.password.length >= 8);
        break;
      default:
        break;
    }
  };

  /**
   * Return appropriate class name dependong on input
   * @param {String} validator The relevant state name
   * @return {String} The `is-hidden` class name or an empty string
   */
  const showOrHide = validator => (validator ? 'is-hidden' : '');

  /**
   * Check completion and validity of form
   * @return {Boolean}
   */
  const checkCompletion = () =>
    user.email === '' ||
    user.hardinessZone === '' ||
    user.username === '' ||
    user.password === '' ||
    user.confirmPassword === '' ||
    !emailAvailable ||
    !emailIsValid ||
    !hardinessZoneIsValid ||
    !usernameAvailable ||
    !passwordLengthOk ||
    !passwordsMatch;

  const handleChange = e => setUser({...user, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('/user/', {
        username: user.username,
        password: user.password,
        email: user.email,
        hardinessZone: user.hardinessZone,
      });
      if (!response.data.error) {
        navigate('/login');
      } else if (
        response.data.error === `The email ${user.email} is already in use.`
      ) {
        setEmailAvailable(false);
      } else if (
        response.data.error === `Sorry, username ${user.username} is already in use.`
      ) {
        setUsernameAvailable(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setUser({
      email: '',
      hardinessZone: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
    setEmailAvailable(true);
    setHardinessZoneIsValid(true);
    setEmailIsValid(true);
    setPasswordLengthOk(true);
    setPasswordsMatch(true);
    setUsernameAvailable(true);

    navigate('/');
  };

  const handleInfoClick = e => setIsActive(!isActive);

  const modalActivator = () => (isActive ? 'is-active' : '');

  return (
    <>
      <section className='section'>
        <div className='columns'>
          <div className='column is-one-third is-offset-one-third'>
            <header className='title has-text-centered'>Sign Up</header>

            <form>
              <div className='field'>
                <div className='control'>
                  <label className='label'>Email:</label>
                  <input
                    className='input'
                    type='email'
                    name='email'
                    autoComplete='email'
                    value={user.email}
                    onChange={handleChange}
                    onBlur={validate}
                  />
                </div>
                <p className={`help is-danger ${showOrHide(emailIsValid)}`}>
                  Please enter a valid email address.
                </p>
                <p className={`help is-danger ${showOrHide(emailAvailable)}`}>
                  Email address is already in use.
                </p>
              </div>

              <div className='field'>
                <div className='control'>
                  <label className='label'>
                    Your USDA Plant Hardiness Zone:{' '}
                    <span
                      id='info'
                      className='icon has-text-grey-light'
                      onClick={handleInfoClick}>
                      <i className='fas fa-info-circle' />
                    </span>
                  </label>
                  <input
                    className='input'
                    type='text'
                    name='hardinessZone'
                    placeholder='Enter a value 1 through 13'
                    value={user.hardinessZone}
                    onChange={handleChange}
                    onBlur={validate}
                  />
                </div>
                <p className={`help is-danger ${showOrHide(hardinessZoneIsValid)}`}>
                  Please enter a valid number 1 through 13.
                </p>
              </div>

              <div className='field'>
                <div className='control'>
                  <label className='label'>Username:</label>
                  <input
                    className='input'
                    type='text'
                    name='username'
                    autoComplete='username'
                    value={user.username}
                    onChange={handleChange}
                    onBlur={validate}
                  />
                </div>
                <p className={`help is-danger ${showOrHide(usernameAvailable)}`}>
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
                    placeholder='Enter a password at least 8 characters long'
                    autoComplete='new-password'
                    value={user.password}
                    onChange={handleChange}
                    onBlur={validate}
                  />
                </div>
                <p className={`help is-danger ${showOrHide(passwordLengthOk)}`}>
                  Password should be at least 8 characters long.
                </p>
              </div>

              <div className='field'>
                <div className='control'>
                  <label className='label'>Confirm Password:</label>
                  <input
                    className='input'
                    type='password'
                    name='confirmPassword'
                    placeholder='Retype password'
                    autoComplete='new-password'
                    value={user.confirmPassword}
                    onChange={handleChange}
                    onBlur={validate}
                  />
                </div>
                <p className={`help is-danger ${showOrHide(passwordsMatch)}`}>
                  Passwords should match.
                </p>
              </div>

              <div className='field is-grouped is-grouped-centered'>
                <div className='control'>
                  <button
                    className='button is-primary'
                    type='submit'
                    onClick={handleSubmit}
                    disabled={checkCompletion()}>
                    Submit
                  </button>
                </div>
                <div className='control'>
                  <button
                    className='button is-text no-shadow'
                    onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className={`modal ${modalActivator()}`}>
        <div className='modal-background' onClick={handleInfoClick}></div>
        <div className='modal-content'>
          <div className='box'>
            <div className='content'>
              <p>
                The <strong>USDA Plant Hardiness Zones</strong> are the standard by
                which gardeners can determine which plants are most likely to thrive
                at a location. The zones are based on average annual minimum winter
                temperature.
              </p>
              <p>
                Check the{' '}
                <a
                  href='https://planthardiness.ars.usda.gov/PHZMWeb/'
                  target='_blank'
                  rel='noopener noreferrer'>
                  USDA Agricultural Research Service website
                </a>{' '}
                to determine the Hardiness Zone of your location.
              </p>
              <p>
                <strong>NOTE:</strong> Zones are sub-divided into <strong>a</strong>{' '}
                and <strong>b</strong>, but plantr just needs the numeric portion.
              </p>
            </div>
          </div>
        </div>
        <button
          className='modal-close is-large'
          aria-label='close'
          onClick={handleInfoClick}></button>
      </div>
    </>
  );
};

export default SignupForm;
