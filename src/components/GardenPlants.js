import React from 'react';
import GardenPlant from './GardenPlant';

const GardenPlants = ({plants, currentUser, getPlants}) => {
  return (
    <div className='container'>
      <div className='columns is-multiline is-centered'>
        {plants
          // sort plants alphabetically by commonName
          .sort((a, b) => (a.plant[0].commonName > b.plant[0].commonName ? 1 : -1))
          // map over plants to return cards
          .map(gardenPlant => (
            <GardenPlant
              gardenPlant={gardenPlant}
              key={gardenPlant._id}
              currentUser={currentUser}
              getPlants={getPlants}
            />
          ))}
      </div>
    </div>
  );
};

export default GardenPlants;
