import React from 'react';

const Pagination = ({cardsPerPage, allPlants, paginate}) => {
  // 🚨refactor?
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPlants / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='columns'>
      <div className='column' />
      <nav>
        <ul className='column margin-bottom'>
          {pageNumbers.map(number => (
            <li className='button is-inline' key={number}>
              <a onClick={() => paginate(number)}>{number}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className='column' />
    </div>
  );
};

export default Pagination;
