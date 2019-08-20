import React, {useEffect, useState} from 'react';
import {Link} from '@reach/router';
import axios from 'axios';
import DetailsTable from '../components/DetailsTable';

const PlantDetails = ({_id, currentUser}) => {
  const [plantWithNotes, setPlantWithNotes] = useState({});
  const [plantInView, setPlantInView] = useState([]);

  useEffect(() => {
    axios
      .get(`/garden/details/${_id}`)
      .then(res => {
        setPlantInView(res.data.data.plant);
        console.log(res.data.data.plant);
        return res;
      })
      .then(res => setPlantWithNotes(res.data.data))
      .catch(err => console.log(err));
  }, []);

  if (!plantInView) {
    return (
      <section className='section'>
        <h1>Loading...</h1>;
      </section>
    );
  }
  return (
    <section className='section'>
      <div className='columns'>
        <div className='column'>
          <Link to='/your-garden'>
            <span role='img' aria-label='left arrow emoji'>
              ⬅️{' '}
            </span>{' '}
            Go Back
          </Link>
        </div>
        <div className='column is-11'>
          <DetailsTable plantInView={plantInView[0]} />
        </div>
      </div>
    </section>
  );
};

export default PlantDetails;
