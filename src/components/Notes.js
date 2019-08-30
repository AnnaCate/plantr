import React, {useState} from 'react';
import axios from 'axios';
import NotesRow from './NotesRow';

const Notes = ({plantWithNotes, setPlantWithNotes, objectId}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newPlantNotes, setNewPlantNotes] = useState({
    variety: '',
    dateStartedIndoors: '',
    dateDirectSowed: '',
    numSeedsSowed: '',
    numGerminated: '',
    dateTransplanted: '',
    numTransplanted: '',
    observations: '',
  });

  const handleChange = e => {
    setNewPlantNotes({
      ...newPlantNotes,
      [e.target.name]: e.target.value,
    });
  };

  const updateNewPlantNotes = () =>
    setNewPlantNotes({
      variety: plantWithNotes.variety,
      dateStartedIndoors: plantWithNotes.dateStartedIndoors,
      dateDirectSowed: plantWithNotes.dateDirectSowed,
      numSeedsSowed: plantWithNotes.numSeedsSowed,
      numGerminated: plantWithNotes.numGerminated,
      dateTransplanted: plantWithNotes.dateTransplanted,
      numTransplanted: plantWithNotes.numTransplanted,
      observations: plantWithNotes.observations,
    });

  const handleCancel = e => {
    e.preventDefault();

    updateNewPlantNotes();
    setIsEditing(false);
  };

  const handleEdit = e => {
    e.preventDefault();

    updateNewPlantNotes();
    setIsEditing(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.put(`/garden/details/${objectId}`, newPlantNotes);
      if (response.status === 200) {
        setPlantWithNotes(response.data.data);
      }
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {plantWithNotes.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className='column is-6 your-notes'>
          <h1 className='subtitle'>
            <span role='img' aria-label='pencil emoji'>
              ✏️{' '}
            </span>{' '}
            Your Notes:
          </h1>
          <table className='table is-fullwidth'>
            <tbody>
              <NotesRow
                th={'Variety planted'}
                isEditing={isEditing}
                input={'variety'}
                handleChange={handleChange}
                plant={plantWithNotes}
                newPlant={newPlantNotes}
              />

              <NotesRow
                th={'Date seeds started (indoors)'}
                isEditing={isEditing}
                input={'dateStartedIndoors'}
                handleChange={handleChange}
                plant={plantWithNotes}
                newPlant={newPlantNotes}
              />

              <NotesRow
                th={'Date seeds started (outdoors)'}
                isEditing={isEditing}
                input={'dateDirectSowed'}
                handleChange={handleChange}
                plant={plantWithNotes}
                newPlant={newPlantNotes}
              />

              <NotesRow
                th={'Number of seeds sown'}
                isEditing={isEditing}
                input={'numSeedsSowed'}
                handleChange={handleChange}
                plant={plantWithNotes}
                newPlant={newPlantNotes}
              />

              <NotesRow
                th={'Number of seeds that germinated'}
                isEditing={isEditing}
                input={'numGerminated'}
                handleChange={handleChange}
                plant={plantWithNotes}
                newPlant={newPlantNotes}
              />

              <NotesRow
                th={'Date transplanted'}
                isEditing={isEditing}
                input={'dateTransplanted'}
                handleChange={handleChange}
                plant={plantWithNotes}
                newPlant={newPlantNotes}
              />

              <NotesRow
                th={'Number of plants transplanted'}
                isEditing={isEditing}
                input={'numTransplanted'}
                handleChange={handleChange}
                plant={plantWithNotes}
                newPlant={newPlantNotes}
              />

              <tr className='has-background-light'>
                <th>Other notes</th>
                {isEditing && (
                  <td>
                    <textarea
                      className='textarea is-small'
                      name='observations'
                      value={newPlantNotes.observations || ''}
                      onChange={handleChange}
                      wrap='hard'
                    />
                  </td>
                )}
                {!isEditing && (
                  <td>
                    {plantWithNotes.observations || (
                      <span className='is-italic has-text-grey'>
                        Click "Edit" to add notes
                      </span>
                    )}
                  </td>
                )}
              </tr>
            </tbody>
          </table>
          {isEditing && (
            <div className='field is-grouped is-grouped-right'>
              <div className='control'>
                <button className='button is-text no-shadow' onClick={handleCancel}>
                  Cancel
                </button>
              </div>
              <div className='control'>
                <input
                  className='button is-primary'
                  type='submit'
                  value='Save'
                  onClick={handleSubmit}
                />
              </div>
            </div>
          )}
          {!isEditing && (
            <button className='button is-pulled-right' onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Notes;
