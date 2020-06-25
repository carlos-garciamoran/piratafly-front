import React from 'react';

import classNames from 'classnames';

function NavMenu(props) {
  // V1.1: add animation for each scene change
  // IDEA: use increased opacity instead of colours
  const shades = {
    1: 'bg-gray-pseudoLightA',
    2: 'bg-gray-pseudoLightB',
    3: 'bg-gray',
    4: 'bg-gray-dark'
  };

  const menu = [1, 2, 3, 4].map((index) => {
    const active = props.scene === index;
    const style = classNames({
      'bg-yellow text-black': active,
      [shades[index]]: !active
    });

    return (
      <li key={index} className={style} onClick={() => props.onClick(index)}>
        { index }
      </li>
    );
  });

  return <ol>{ menu }</ol>;
}

export default NavMenu;
