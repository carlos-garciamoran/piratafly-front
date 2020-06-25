import React from 'react';

import { formatDate } from 'services/helpers';

function FlightInfo(props) {
  const { flight, seats } = props;
  const titleStyle = 'block font-semibold mb-2 text-lg text-yellow tracking-wide';

  return (
    <div id="flight-info">
      <svg
        className="fill-current mr-4 pt-1 text-yellow h-8 w-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20">
          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
      </svg>

      <div className="w-full">
        <div>
          <span className={titleStyle}>Info del vuelo</span>
          <ul className="text-white">
            <li>– Nº de vuelo: <span className="font-bold text-yellow">{ flight.number }</span></li>
            <li>– Fecha de salida: <span className="font-bold text-yellow">{ formatDate(flight.departure_date) }</span></li>
            <li>– Ruta: <span className="font-bold text-yellow">{ flight.origin } — { flight.destination }</span></li>
          </ul>
        </div>

        {/* V1.1: add seat icon next to title */}
        { seats && (
        <div className="border-t border-yellow mt-4 pt-4">
          <span className={titleStyle}>Tus asientos</span>
          { seats.map((seat, index) =>
            <div className="badge bg-gray-light font-semibold mb-1 mr-2" key={index}>{ seat }</div>
          )}
        </div>
        )}
      </div>
    </div>
  );
}

export default FlightInfo;
