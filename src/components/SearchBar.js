import React, {useState} from 'react';

const SearchBar = ({
  allPlants,
  setVisiblePlants,
  setSearchIsActive,
  setCurrentPage,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = value => {
    const foundPlant = allPlants.filter(plant =>
      plant.commonName.toLowerCase().startsWith(value.toLowerCase())
    );
    if (value.length === 0) {
      setSearchIsActive(false);
      setVisiblePlants(allPlants.slice(0, 8));
      setCurrentPage(1);
    } else {
      setSearchIsActive(true);
      setVisiblePlants(foundPlant);
    }
  };

  const handleChange = e => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <input
      id='search-box'
      className='input'
      type='text'
      placeholder='Search for a plant...'
      value={searchTerm || ''}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
