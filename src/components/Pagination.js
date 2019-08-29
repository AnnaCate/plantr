import React, {useState, useEffect} from 'react';

const Pagination = ({allPlantsLength, currentPage, setCurrentPage}) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    for (let i = 1; i <= Math.ceil(allPlantsLength / 8); i++) {
      setPageNumbers(pageNumbers => [...pageNumbers, i]);
    }
  }, [allPlantsLength]);

  const makeActive = number => (number === currentPage ? 'is-current' : '');

  return (
    <div className='columns stick-to-bottom'>
      <div className='column is-one-third is-offset-one-third'>
        <nav className='pagination' role='navigation' aria-label='pagination'>
          <ul className='pagination-list'>
            {pageNumbers.map(number => (
              <li
                key={number}
                className={`pagination-link ${makeActive(number)}`}
                aria-label={`Page ${number}`}
                onClick={() => setCurrentPage(number)}>
                {number}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
