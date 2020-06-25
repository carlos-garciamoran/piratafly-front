import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { useAuth0 } from 'services/auth0';

function Header() {
  const { isAuthenticated, loading, loginWithRedirect, logout, user } = useAuth0();

  const [menuOpened, setMenuOpened] = useState(false);
  const [userToggle, setUserToggle] = useState(false);

  // V1.1: define in app.scss
  const navLink = 'mt-4 sm:mt-0 mr-0 sm:mr-4 text-yellow hover:text-white';
  const userMenu = classNames(
    'absolute bg-gray-lighter flex flex-col mt-2 px-2 py-2 left-0 rounded',
    { 'hidden': !userToggle }
  );
  const responsiveNav = classNames('sm:flex sm:items-center sm:w-auto w-full', {
    'hidden': !menuOpened
  });

  return (
    <nav>
      <Link to="/">
        <div className="px-2 text-yellow text-3xl">
          <span className="font-thin">Pirata</span>
          <span className="font-semibold">Fly</span>
        </div>
      </Link>

      <div className="sm:hidden">
        {/* V1.1: add CSS transition/animation to menu toggling so it's smooth */}
        <button
          type="button"
          className="border border-yellow px-3 py-1 rounded text-yellow"
          onClick={() => setMenuOpened(!menuOpened)}>
          <FontAwesomeIcon icon="bars" color="#e0e0e0" />
        </button>
      </div>

      {/* V1.1 enhance responsiveness (user menu, abstract CSS classes, etc.) */}
      <div className={responsiveNav}>
        <div className="sm:relative sm:flex sm:flex-grow">
          { isAuthenticated && !loading ? (
            <>
            <div className="flex flex-col sm:inline-block" onClick={() => setMenuOpened(!menuOpened)}>
              <Link to="/flights" className={navLink}>Mis vuelos</Link>
              <Link to="/flight/new" className={navLink}>Nuevo vuelo</Link>
            </div>

            <div className="sm:mt-0 mt-4" onClick={() => setUserToggle(!userToggle)}>
              <FontAwesomeIcon icon="user" color="#f7e406" size="lg" className="mr-1" />
              <FontAwesomeIcon icon="caret-down" color="#f7e406" />
            </div>

            {/* V1.1 enhance this ugly design (highlight button, add icons, etc.) */}
            <div className={userMenu}>
              <div className="flex items-center">
                <span className="mr-1">{user.name}</span>
                <img src={user.picture} width="32" height="32" alt="Perfil" />
              </div>

              <span className="border-b border-yellow pb-1">{user.email}</span>
              <button
                type="button"
                className="bg-gray-dark mt-1 rounded text-gray-lightest"
                onClick={() => logout()}>
                Cerrar sesión
              </button>
            </div>
            </>
          ) : (
            <>
            <button type="button" onClick={() => loginWithRedirect()}>Iniciar sesión</button>
            </>
          )}
        </div>
        {/* V1.1: set up PayPal + enable donate link
        <Link to="/donate"
              className="border border-white inline-block leading-none my-4 sm:my-0 sm:ml-4 px-4 py-2 rounded text-sm text-white">
          Donar
        </Link>
        */}
      </div>
    </nav>
  );
}

export default Header;
