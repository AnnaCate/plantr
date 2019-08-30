import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import PlantList from '../components/PlantList';
import Pagination from '../components/Pagination';
import IconLegend from '../components/IconLegend';

const HomePage = ({currentUser}) => {
  const [allPlants, setAllPlants] = useState([]);
  const [visiblePlants, setVisiblePlants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [gardenPlants, setGardenPlants] = useState([]);

  // GET plants from plants API on render
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('/plants');

        // set all plants in alphabetical order by commonName
        const plants = response.data.data.sort((a, b) =>
          a.commonName > b.commonName ? 1 : -1
        );
        setAllPlants(plants);

        // set first 8 plants as visiblePlants
        setVisiblePlants(plants.slice(0, 8));
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlants();
  }, []);

  // paginate plants, 8 per page, depending on currentPage
  useEffect(() => {
    setVisiblePlants(allPlants.slice((currentPage - 1) * 8, currentPage * 8));
  }, [currentPage, allPlants]);

  const getGardenPlants = async userId => {
    if (!currentUser.loggedIn) {
      setGardenPlants([]);
      return;
    }
    try {
      const response = await axios.get(`/garden/${userId}`);
      if (response.status === 200 && response.data.data) {
        setGardenPlants(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGardenPlants(currentUser._id);
  }, [currentUser._id, currentUser.loggedIn]);

  return (
    <>
      <section className='section no-bottom-padding'>
        <div className='columns'>
          <div className='column is-one-third'>
            {currentUser.loggedIn && <IconLegend currentUser={currentUser} />}
          </div>

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
        <PlantList
          plants={visiblePlants}
          currentUser={currentUser}
          gardenPlants={gardenPlants}
          getGardenPlants={getGardenPlants}
        />
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
