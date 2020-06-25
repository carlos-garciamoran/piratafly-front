import React from 'react';

import InputError from '../../components/InputError';

function Seat(props) {
  const { index, seat, errors, removeSeat } = props;

  return (
    <div className="flex mb-4">
      <span className="border border-yellow mr-2 py-1 text-center text-xl text-yellow rounded w-1/2">
        {seat}
      </span>

      {/* V1.1: add wastebasket/close icon */}
      <button
        className="btn-half bg-gray text-red-600"
        type="button"
        onClick={() => removeSeat(seat)}>
        Borrar
      </button>

      {/*V1.1: make sure errors appear properly */}
      <InputError el={'seats.'+(index)} errors={errors} />
    </div>
  );
}

export default Seat;
