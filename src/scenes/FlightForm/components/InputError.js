import React from 'react';

function InputError(props) {
  const { errors, el } = props;

  if (errors.hasOwnProperty(el)) {
    return <p className="error">{ errors[el] }</p>
  }

  return null;
}

export default InputError;
