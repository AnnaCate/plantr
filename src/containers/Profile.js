import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Profile = ({user, setUser}) => {
  const [newUserData, setNewUserData] = useState({
    hardinessZone: user.hardinessZone,
  });
  const [defaultState, setDefaultState] = useState({
    hardinessZone: '',
  });
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // validation states
  const [hardinessZoneIsValid, setHardinessZoneIsValid] = useState(true);

  useEffect(() => setDefaultState({hardinessZone: user.hardinessZone}), [
    user.hardinessZone,
  ]);

  /**
   * Validate each input field
   * @param {Event} e onBlur event
   */
  const validate = () =>
    setHardinessZoneIsValid(
      newUserData.hardinessZone >= 1 && newUserData.hardinessZone <= 13
    );

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
    isEditing && (newUserData.hardinessZone === '' || !hardinessZoneIsValid);

  const handleChange = e =>
    setNewUserData({...newUserData, [e.target.name]: e.target.value});

  const handleEdit = e => {
    e.preventDefault();

    setIsEditing(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.put('/user/profile', {
        hardinessZone: newUserData.hardinessZone,
      });
      if (response.status === 200) {
        setIsEditing(false);
        setUser({...user, hardinessZone: newUserData.hardinessZone});
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = e => {
    e.preventDefault();

    setNewUserData(defaultState);
    setIsEditing(false);
    setHardinessZoneIsValid(true);
  };

  const handleInfoClick = e => setIsActive(!isActive);

  const modalActivator = () => (isActive ? 'is-active' : '');

  return (
    <>
      <section className='section'>
        <div className='columns'>
          <div className='column is-one-third is-offset-one-third'>
            <header className='title has-text-centered'>Your Profile</header>

            <div className='field is-horizontal'>
              <div className='field-label'>
                <label className='label'>Email:</label>
              </div>
              <div className='field-body'>
                <p className='profile-text'>{user.email}</p>
              </div>
            </div>

            <div className='field is-horizontal'>
              <div className='field-label'>
                <label className='label'>Username:</label>
              </div>
              <div className='field-body'>
                <p className='profile-text'>{user.username}</p>
              </div>
            </div>

            <div className='field is-horizontal'>
              <div id='hardiness-label' className='field-label'>
                <label className='label'>
                  USDA Plant Hardiness Zone:{' '}
                  <span
                    id='info'
                    className='icon has-text-grey-light'
                    onClick={handleInfoClick}>
                    <i className='fas fa-info-circle' />
                  </span>
                </label>
              </div>
              <div className='field-body'>
                {!isEditing && (
                  <p id='hardiness-text' className='profile-text'>
                    {user.hardinessZone}
                  </p>
                )}
                {isEditing && (
                  <div className='field'>
                    <p className='control'>
                      <input
                        className='input'
                        type='text'
                        name='hardinessZone'
                        placeholder='Enter a value 1 through 13'
                        value={newUserData.hardinessZone}
                        onChange={handleChange}
                        onBlur={validate}
                      />
                      <span
                        className={`help is-danger ${showOrHide(
                          hardinessZoneIsValid
                        )}`}>
                        Please enter a valid number 1 through 13.
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className='field is-grouped is-grouped-right'>
              {isEditing && (
                <div className='control'>
                  <button
                    className='button is-text no-shadow'
                    onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              )}
              <div className='control'>
                {isEditing && (
                  <input
                    className='button is-primary'
                    type='submit'
                    value='Save'
                    disabled={checkCompletion()}
                    onClick={handleSubmit}
                  />
                )}
                {!isEditing && (
                  <button
                    className='button is-primary'
                    type='button'
                    onClick={handleEdit}>
                    Edit
                  </button>
                )}
              </div>
            </div>
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

export default Profile;
