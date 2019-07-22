import React from 'react';

const SearchBar = props => {
  return (
    <div className='field is-grouped'>
      <div className='control'>
        <input
          id='search-box'
          className='input'
          type='text'
          placeholder='Search for a plant...'
        />
      </div>
      <div className='control'>
        <button className='button is-primary'>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
