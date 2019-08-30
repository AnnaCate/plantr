import React, {useEffect, useState} from 'react';
import {Link} from '@reach/router';
import axios from 'axios';
import DetailsTable from '../components/DetailsTable';
import Notes from '../components/Notes';

const PlantDetails = ({_id}) => {
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

  useEffect(() => {
    const fetchPlant = async id => {
      try {
        const response = await axios.get(`/garden/details/${id}`);
        if (response.status === 200) {
          setPlantInView(response.data.data.plant[0]);
          setPlantWithNotes(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlant(_id);
  }, [_id]);

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
              <div className='column is-6'>
                <h1 className='subtitle'>
                  <span role='img' aria-label='book emoji'>
                    📖{' '}
                  </span>{' '}
                  Plant Information:
                </h1>
                <DetailsTable plant={plantInView} />
              </div>

              <Notes
                plantWithNotes={plantWithNotes}
                setPlantWithNotes={setPlantWithNotes}
                objectId={_id}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default PlantDetails;
