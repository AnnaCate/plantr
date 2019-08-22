import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import PlantList from '../components/PlantList';
import Pagination from '../components/Pagination';

const HomePage = props => {
  const [allPlants, setAllPlants] = useState([]);
  const [visiblePlants, setVisiblePlants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchIsActive, setSearchIsActive] = useState(false);

  // GET plants from API
  useEffect(() => {
    axios
      .get('/plants')
      .then(res => {
        // set all plants in alphabetical order by commonName
        setAllPlants(
          res.data.data.sort((a, b) => (a.commonName > b.commonName ? 1 : -1))
        );
        return res.data.data;
      })
      // set first 8 plants as visiblePlants
      .then(res => setVisiblePlants(res.slice(0, 8)))
      .catch(err => console.log(err));
  }, []);

  // paginate plants, 8 per page, depending on currentPage
  useEffect(() => {
    setVisiblePlants(allPlants.slice((currentPage - 1) * 8, currentPage * 8));
  }, [currentPage, allPlants]);

  return (
    <>
      <section className='section no-bottom-padding'>
        <div className='columns'>
          <div className='column is-one-third' />
          <div className='column is-one-third has-text-centered'>
            <SearchBar
              allPlants={allPlants}
              setVisiblePlants={setVisiblePlants}
              setSearchIsActive={setSearchIsActive}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <div className='column is-one-third' />
        </div>
      </section>

      <section className='section'>
        <PlantList plants={visiblePlants} currentUser={props.currentUser} />
      </section>
      {!searchIsActive && (
        <Pagination
          currentPage={currentPage}
          allPlantsLength={allPlants.length}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default HomePage;
