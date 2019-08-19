import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import PlantList from '../components/PlantList';
import Pagination from '../components/Pagination';

const HomePage = props => {
  const [allPlants, setAllPlants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);

  useEffect(() => getAllPlants(), []);

  const getAllPlants = () => {
    axios
      .get('/plants')
      .then(res => setAllPlants(res.data.data))
      .catch(err => console.log(err));
  };

  /** 🚨 pagination code - needs refactoring
   * Turn this into a function;
   * Figure out how to sort `visibleCards` by `commonName`
   */
  const indexOfLastPlant = currentPage * cardsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - cardsPerPage;
  const visibleCards = allPlants.slice(indexOfFirstPlant, indexOfLastPlant);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <section className='section no-bottom-padding'>
        <div className='columns'>
          <div className='column is-one-third' />
          <div className='column is-one-third'>
            <SearchBar />
          </div>
          <div className='column is-one-third' />
        </div>
      </section>

      <section className='section'>
        <PlantList allPlants={visibleCards} currentUser={props.currentUser} />
      </section>
      <Pagination
        cardsPerPage={cardsPerPage}
        allPlants={allPlants.length}
        paginate={paginate}
      />
    </>
  );
};

export default HomePage;
