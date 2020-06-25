import React from 'react';

import classNames from 'classnames';
import { formatDate } from 'services/helpers';

function Card(props) {
  const { index, flight, discarded, selected } = props;

  // V2.0: preferred format => Jueves, 28 de mayo | 20:30
  const departureDate = formatDate(flight.departure_date, 'weekday');
  const grayTone = index % 2 === 0 ? 'B' : 'A';

  // V1.1: dynamically adjust padding according to border presence
  const cardStyle = classNames('mt-3 px-6 py-3 rounded', {
    'bg-gray border border-yellow': selected,
    [`bg-gray-pseudoLight${grayTone}`]: !selected,
    'opacity-50': !selected && discarded
  });

  const bodyStyle = classNames('flex border-t mt-3 pt-2', {
    'border-yellow': selected
  });

  const badgeStyle = classNames('badge', {
     'bg-yellow text-black': selected,
     'bg-black text-white': !selected
  });

  return (
    <div className={cardStyle} onClick={props.onClick}>
      <span className="text-xl text-yellow">{departureDate}</span>

      {/* V1.1: move FlightNumber badge to title (only display once) */}
      <div className={bodyStyle}>
        <div className="w-1/2">
          <p className="mb-1 text-white">Nº de vuelo</p>
          <span className={badgeStyle}>
            {flight.number}
          </span>
        </div>

        <div className="w-1/2">
          <p className="mb-1 text-white">Ruta</p>
          <span className={badgeStyle}>
            {flight.origin} — {flight.destination}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
