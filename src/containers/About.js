import React from 'react';

const About = () => {
  return (
    <section className='section'>
      <div className='content'>
        <p>
          Use <strong>plantr</strong> to help you plan your edible garden!
        </p>
        <p>To get started: </p>
        <ul>
          <li>Browse and search for plants that you're interested in growing.</li>
          <li>
            Quickly see which plants are or are not suited for your USDA Plant
            Hardiness Zone by checking for the
            <span className='icon'>
              <span role='img' aria-label='ok emoji' className='is-size-7'>
                🆗
              </span>
            </span>
            and
            <span className='icon has-text-danger'>
              <i className='fas fa-ban' />
            </span>{' '}
            icons (only available when logged in).
          </li>
          <li>
            Click on "See details" to see important information about plants that
            you're interested in.
          </li>
          <li>
            To save a plant to Your Garden, first click "Sign up" in the top right to
            create an account.
          </li>
          <li>Click on "Plant it!" to save a plant to Your Garden.</li>
          <li>
            View all plants that you've saved, and their details, in Your Garden.
          </li>
          <li>
            Add notes to plants that you've saved, such as date planted, how many
            seeds you sowed, or any other notes you might want to record about the
            plant.
          </li>
          <li>
            Remove any unwanted plants from Your Garden simply by clicking "Remove"
            (be careful though, you'll lose all the notes you wrote about that
            plant).
          </li>
        </ul>
        <br />
        <p>Now grow something!</p>
      </div>
    </section>
  );
};

export default About;
