import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import Banner from 'components/Banner';
import Flight from './Flight';

function FlightIndex(props) {
  const [flights, setFlights] = useState('');

  function fetchUserFlights() {
    axios.get('/my-flights')
      .then(({ data }) => {
        if (data.flights.length > 0) {
          setFlights(data.flights.map((flight) =>
            <Flight data={flight} key={flight.flight.departure_date} />
          ));
        }
      })
      // V1.1: indicate flights couldn't be retrieved.
      // .catch(err => { console.log(err) });
  }

  useEffect(() => fetchUserFlights(), []);

  return (
    <>
    {/* V1.1: add close/hide button */}
    <Banner title="Recuerda...">
      <p className="text-sm">
        Recibirás tus nuevos asientos 1 hora antes del despegue del vuelo.
      </p>
    </Banner>

    <div id="box">
      <h1>Mis PirataFly&apos;s</h1>
      {/* V1.1: add spinner while fetching user flights */}
      {/* V1.1: add CSS/JS transition/fade away to display data fetch smoothly */}
      {/* V1.1: ensure order is by `departure_date` */}
      {/* V2.0: paginate */}
      <div>
        { flights ? ( flights ) : (
        <>
        <div className="bg-white border border-gray-dark text-black px-3 py-2 relative rounded">
          <span className="text-sm">No se encontraron vuelos.</span>
        </div>
        <Link to="/flight/new" className="btn flex justify-center mt-6 py-3">¡Buscar vuelos!</Link>
        </>
        )}
      </div>
    </div>
    </>
  );
}

export default FlightIndex;
