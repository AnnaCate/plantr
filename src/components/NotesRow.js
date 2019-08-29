import React from 'react';

const NotesRow = ({th, isEditing, input, handleChange, plant, newPlant}) => {
  return (
    <tr className='has-background-light'>
      <th>{th}</th>
      {isEditing && (
        <td>
          <input
            className='input is-small'
            type='text'
            name={`${input}`}
            value={newPlant[input] || ''}
            onChange={handleChange}
          />
        </td>
      )}
      {!isEditing && (
        <td>
          {plant[input] || (
            <span className='is-italic has-text-grey'>
              Click "Edit" to add notes
            </span>
          )}
        </td>
      )}
    </tr>
  );
};

export default NotesRow;
