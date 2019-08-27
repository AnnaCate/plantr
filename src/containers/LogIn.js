import React, {useState} from 'react';
import {navigate} from '@reach/router';
import axios from 'axios';

const LogInForm = props => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [isValid, setIsValid] = useState(true);

  const checkCompletion = () => user.username === '' || user.password === '';

  const handleChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
    setIsValid(true);
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
      .catch(() => setIsValid(false));
  };

  const handleCancel = () => {
    setUser({
      username: '',
      password: '',
    });
    navigate('/');
  };

  const helpHelper = () => (isValid ? 'is-invisible' : '');

  return (
    <section className='section'>
      <div className='columns'>
        <div className='column is-one-third is-offset-one-third'>
          <header className='title has-text-centered'>Log In</header>

          <form>
            <div className='field'>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  name='username'
                  placeholder='username'
                  autoComplete='username'
                  value={user.username}
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
                  autoComplete='current-password'
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              <p className={`help is-danger ${helpHelper()}`}>
                Incorrect username or password.
              </p>
            </div>

            <div className='field is-grouped is-grouped-centered'>
              <div className='control'>
                <button
                  className='button is-primary'
                  type='submit'
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
          </form>
        </div>
      </div>
    </section>
  );
};

export default LogInForm;
