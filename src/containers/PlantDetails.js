import React, {useEffect, useState} from 'react';
import {Link} from '@reach/router';
import axios from 'axios';
import DetailsTable from '../components/DetailsTable';
import Notes from '../components/Notes';

const PlantDetails = ({_id, currentUser}) => {
  const [plantWithNotes, setPlantWithNotes] = useState({
    variety: '',
    dateStartedIndoors: '',
    dateDirectSowed: '',
    numSeedsSowed: '',
    numGerminated: '',
    dateTransplanted: '',
    numTransplanted: '',
    observations: '',
  });
  const [plantInView, setPlantInView] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get(`/garden/details/${_id}`)
      .then(res => {
        setPlantInView(res.data.data.plant[0]);
        return res;
      })
      .then(res => {
        setPlantWithNotes(res.data.data);
      })
      .catch(err => console.log(err));
  }, [_id]);

  const handleChange = e => {
    setPlantWithNotes({
      ...plantWithNotes,
      [e.target.name]: e.target.value,
    });
  };

  // 🚨This definitely needs to be done differently
  const handleCancel = () => {
    setIsEditing(false);
    axios.get(`/garden/details/${_id}`).then(res => {
      setPlantWithNotes(res.data.data);
    });
  };

  const handleEdit = () => setIsEditing(true);

  const handleSubmit = e => {
    e.preventDefault();
    setIsEditing(false);

    axios({
      method: 'put',
      url: `/garden/details/${_id}`,
      data: {
        variety: plantWithNotes.variety,
        dateStartedIndoors: plantWithNotes.dateStartedIndoors,
        dateDirectSowed: plantWithNotes.dateDirectSowed,
        numSeedsSowed: plantWithNotes.numSeedsSowed,
        numGerminated: plantWithNotes.numGerminated,
        dateTransplanted: plantWithNotes.dateTransplanted,
        numTransplanted: plantWithNotes.numTransplanted,
        observations: plantWithNotes.observations,
      },
    });
  };

  return (
    <>
      {plantInView.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className='section no-bottom-padding'>
            <Link to='/your-garden'>
              <span role='img' aria-label='left arrow emoji'>
                ⬅️{' '}
              </span>{' '}
              Go Back
            </Link>
          </div>

          <header className='hero'>
            <div className='hero-body' id='plant-details-header'>
              <h1 className='title'>{plantInView.commonName}</h1>
            </div>
          </header>

          <section className='section'>
            <div className='columns'>
              <DetailsTable plantInView={plantInView} />

              <Notes
                isEditing={isEditing}
                plantWithNotes={plantWithNotes}
                handleChange={handleChange}
                handleCancel={handleCancel}
                handleEdit={handleEdit}
                handleSubmit={handleSubmit}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default PlantDetails;
