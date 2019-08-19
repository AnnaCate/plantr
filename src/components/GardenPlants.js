import React from 'react';
import GardenPlant from './GardenPlant';

const GardenPlants = ({plants, currentUser}) => {
  return (
    <div className='container'>
      <div className='columns is-multiline is-centered'>
        {plants
          // sort plants alphabetically by commonName
          .sort((a, b) => (a.plant.commonName > b.plant.commonName ? 1 : -1))
          // map over plants to return cards
          .map(eachPlant => (
            <GardenPlant
              eachPlant={eachPlant}
              key={eachPlant._id}
              currentUser={currentUser}
            />
          ))}
      </div>
    </div>
  );
};

export default GardenPlants;
