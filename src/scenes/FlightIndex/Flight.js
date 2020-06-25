import React from 'react';

import { formatDate } from 'services/helpers';

function Flight(props) {
  // V1.1: create utility classes to keep code DRY
  const { flight, old_seats, new_seats } = props.data;

  return (
    <div className="bg-gray-lighter mt-2 rounded">
      <div className="px-4 py-2 text-white">
        <div className="flex items-center">
          <span className="text-gray-dark w-1/2">Número de vuelo</span>
          <span className="badge bg-gray-dark w-1/2">{ flight.number }</span>
        </div>

        <div className="flex items-center mt-1">
          <span className="text-gray-dark w-1/2">Ruta</span>
          <span className="badge bg-gray-dark w-1/2">{ flight.origin } — { flight.destination }</span>
        </div>

        <div className="flex items-center mt-1">
          <span className="text-gray-dark w-1/2">Fecha de salida</span>
          <span className="badge bg-gray-dark w-1/2">{ formatDate(flight.departure_date) }</span>
        </div>

        {/*V1.1: show ordered seats (swap [8E, 8D] for [8D, 8E])*/}
        <div className="flex mt-4">
          <div className="w-1/2">
            <span className="text-gray-dark">Asientos originales</span>
            <div>
              { old_seats.map((seat, index) =>
              <span className="badge bg-gray-dark mb-1 mr-2" key={index}>
                {seat}
              </span>
              )}
            </div>
          </div>

          <div className="w-1/2">
            <span className="text-gray-dark font-semibold">Nuevos asientos</span>
            <div>
              { new_seats ? (
              new_seats.map((seat, index) =>
              <span className="badge bg-yellow font-semibold mb-1 mr-2 text-black" key={index}>
                {seat}
              </span>
              )) : (
              // #IDEA: add countdown from current time to departure date 
              <div className="bg-white border border-gray-dark text-black px-3 py-2 rounded">
                <span className="text-sm">Tus asientos serán asignados 1 hora antes del despegue.</span>
              </div>
              )}
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default Flight;
