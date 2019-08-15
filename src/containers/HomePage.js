import React from 'react';

import SearchBar from '../components/SearchBar';

const HomePage = props => {
  return (
    <section className='section'>
      <div className='columns'>
        <div className='column is-one-third' />
        <div className='column is-one-third'>
          <SearchBar />
        </div>
        <div className='column is-one-third' />
      </div>
    </section>
  );
};

export default HomePage;
