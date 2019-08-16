import React from 'react';
import Plant from './Plant';

const PlantList = props => {
  return (
    <div className='container'>
      <div className='columns is-multiline is-centered'>
        {props.allPlants
          // sort plants alphabetically by commonName
          .sort((a, b) => (a.commonName > b.commonName ? 1 : -1))
          // map over plants to return cards
          .map(plant => (
            <Plant plant={plant} key={plant._id} currentUser={props.currentUser} />
          ))}
      </div>
    </div>
  );
};

export default PlantList;
