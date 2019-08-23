import React, {useState} from 'react';
import DetailsTable from './DetailsTable';

/** 🚨DEPRECATED */

const GardenModal = ({eachPlant, handleDelete, toggleActive, isActive}) => {
  const plant = eachPlant.plant[0];

  const [detailsTabIsActive, setDetailsTabIsActive] = useState('is-active');
  const [notesTabIsActive, setNotesTabIsActive] = useState('');

  // update `is-active` state for tabs
  const toggleActiveTab = () => {
    detailsTabIsActive
      ? setDetailsTabIsActive('')
      : setDetailsTabIsActive('is-active');
    notesTabIsActive ? setNotesTabIsActive('') : setNotesTabIsActive('is-active');
  };

  return (
    <div className={`modal ${isActive}`}>
      <div className='modal-background' onClick={toggleActive} />
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{plant.commonName}</p>
          <button className='delete' aria-label='close' onClick={toggleActive} />
        </header>

        <section className='modal-card-body'>
          <div className='tabs is-boxed'>
            <ul>
              <li className={`${detailsTabIsActive}`} onClick={toggleActiveTab}>
                <a>Details</a>
              </li>
              <li className={`${notesTabIsActive}`} onClick={toggleActiveTab}>
                <a>Your Notes</a>
              </li>
            </ul>
          </div>
          <DetailsTable plant={plant} />

          {/* <PlantNotes plant={plant} /> */}

          {/* <table className='table'>
              <tbody>
                <tr>
                  <th className='has-background-light'>Add Notes:</th>
                  <td className='has-background-light' />
                </tr>
                <tr>
                  <th>Variety planted:</th>
                  <td>
                    <input className='input' type='text' />
                  </td>
                </tr>
                <tr>
                  <th>Date seeds started (indoors):</th>
                  <td>
                    <input className='input' type='date' />
                  </td>
                </tr>
                <tr>
                  <th>Date seeds started (outdoors):</th>
                  <td>
                    <input className='input' type='date' />
                  </td>
                </tr>
                <tr>
                  <th>Number of seeds sown:</th>
                  <td>
                    <input className='input' type='number' />
                  </td>
                </tr>
                <tr>
                  <th>Number of seeds that germinated:</th>
                  <td>
                    <input className='input' type='number' />
                  </td>
                </tr>
                <tr>
                  <th>Date transplanted:</th>
                  <td>
                    <input className='input' type='date' />
                  </td>
                </tr>
                <tr>
                  <th>Number of plants transplanted:</th>
                  <td>
                    <input className='input' type='number' />
                  </td>
                </tr>
                <tr>
                  <th>Other notes:</th>
                  <td>
                    <textarea className='textarea' />
                  </td>
                </tr>
              </tbody>
            </table> */}
        </section>

        <footer className='modal-card-foot'>
          <button className='button is-primary' onClick={toggleActive}>
            {/* Change to 'Cancel' when editing */}
            Close
          </button>
          <button className='button' onClick={() => handleDelete(eachPlant._id)}>
            Remove
          </button>
        </footer>
      </div>
    </div>
  );
};

export default GardenModal;
