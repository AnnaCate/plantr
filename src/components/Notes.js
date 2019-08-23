import React from 'react';

const Notes = ({
  isEditing,
  plantWithNotes,
  handleChange,
  handleCancel,
  handleEdit,
  handleSubmit,
}) => {
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
              <tr className='has-background-light'>
                <th>Variety planted</th>
                {isEditing && (
                  <td>
                    <input
                      className='input is-small'
                      type='text'
                      name='variety'
                      value={plantWithNotes.variety || ''}
                      onChange={handleChange}
                    />
                  </td>
                )}
                {!isEditing && (
                  <td>
                    {plantWithNotes.variety || (
                      <span className='is-italic has-text-grey'>
                        Click "Edit" to add a variety
                      </span>
                    )}
                  </td>
                )}
              </tr>
              <tr className='has-background-light'>
                <th>Date seeds started (indoors)</th>
                {isEditing && (
                  <td>
                    <input
                      className='input is-small'
                      type='text'
                      name='dateStartedIndoors'
                      value={plantWithNotes.dateStartedIndoors || ''}
                      onChange={handleChange}
                    />
                  </td>
                )}
                {!isEditing && (
                  <td>
                    {plantWithNotes.dateStartedIndoors || (
                      <span className='is-italic has-text-grey'>
                        Click "Edit" to input a date
                      </span>
                    )}
                  </td>
                )}
              </tr>
              <tr className='has-background-light'>
                <th>Date seeds started (outdoors)</th>
                {isEditing && (
                  <td>
                    <input
                      className='input is-small'
                      type='text'
                      name='dateDirectSowed'
                      value={plantWithNotes.dateDirectSowed || ''}
                      onChange={handleChange}
                    />
                  </td>
                )}
                {!isEditing && (
                  <td>
                    {plantWithNotes.dateDirectSowed || (
                      <span className='is-italic has-text-grey'>
                        Click "Edit" to input a date
                      </span>
                    )}
                  </td>
                )}
              </tr>
              <tr className='has-background-light'>
                <th>Number of seeds sown</th>
                {isEditing && (
                  <td>
                    <input
                      className='input is-small'
                      type='text'
                      name='numSeedsSowed'
                      value={plantWithNotes.numSeedsSowed || ''}
                      onChange={handleChange}
                    />
                  </td>
                )}
                {!isEditing && (
                  <td>
                    {plantWithNotes.numSeedsSowed || (
                      <span className='is-italic has-text-grey'>
                        Click "Edit" to input a number
                      </span>
                    )}
                  </td>
                )}
              </tr>
              <tr className='has-background-light'>
                <th>Number of seeds that germinated</th>
                {isEditing && (
                  <td>
                    <input
                      className='input is-small'
                      type='text'
                      name='numGerminated'
                      value={plantWithNotes.numGerminated || ''}
                      onChange={handleChange}
                    />
                  </td>
                )}
                {!isEditing && (
                  <td>
                    {plantWithNotes.numGerminated || (
                      <span className='is-italic has-text-grey'>
                        Click "Edit" to input a number
                      </span>
                    )}
                  </td>
                )}
              </tr>
              <tr className='has-background-light'>
                <th>Date transplanted</th>
                {isEditing && (
                  <td>
                    <input
                      className='input is-small'
                      type='text'
                      name='dateTransplanted'
                      value={plantWithNotes.dateTransplanted || ''}
                      onChange={handleChange}
                    />
                  </td>
                )}
                {!isEditing && (
                  <td>
                    {plantWithNotes.dateTransplanted || (
                      <span className='is-italic has-text-grey'>
                        Click "Edit" to input a date
                      </span>
                    )}
                  </td>
                )}
              </tr>
              <tr className='has-background-light'>
                <th>Number of plants transplanted</th>
                {isEditing && (
                  <td>
                    <input
                      className='input is-small'
                      type='text'
                      name='numTransplanted'
                      value={plantWithNotes.numTransplanted || ''}
                      onChange={handleChange}
                    />
                  </td>
                )}
                {!isEditing && (
                  <td>
                    {plantWithNotes.numTransplanted || (
                      <span className='is-italic has-text-grey'>
                        Click "Edit" to input a number
                      </span>
                    )}
                  </td>
                )}
              </tr>
              <tr className='has-background-light'>
                <th>Other notes</th>
                {isEditing && (
                  <td>
                    <textarea
                      className='textarea is-small'
                      name='observations'
                      value={plantWithNotes.observations || ''}
                      onChange={handleChange}
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
                <button className='button is-text' onClick={handleCancel}>
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
