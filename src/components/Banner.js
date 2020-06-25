import React from 'react';

function Banner(props) {
  return (
    <div id="banner">
      <p id="banner-title">{ props.title }</p>
      { props.children }
    </div>
  );
}

export default Banner;
