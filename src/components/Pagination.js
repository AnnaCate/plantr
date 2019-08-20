import React, {useState, useEffect} from 'react';

/** 🚨Need to add ellipses for lots of page numbers */

const Pagination = ({allPlantsLength, currentPage, setCurrentPage}) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    for (let i = 1; i <= Math.ceil(allPlantsLength / 8); i++) {
      setPageNumbers(pageNumbers => [...pageNumbers, i]);
    }
  }, [allPlantsLength]);

  const makeActive = number =>
    number === currentPage ? 'has-background-grey-lighter' : '';

  return (
    <div className='columns'>
      <div className='column' />
      <nav>
        <ul className='column margin-bottom'>
          {pageNumbers.map(number => (
            <li
              className={`button is-inline ${makeActive(number)}`}
              key={number}
              onClick={() => setCurrentPage(number)}>
              {number}
            </li>
          ))}
        </ul>
      </nav>
      <div className='column' />
    </div>
  );
};

export default Pagination;
