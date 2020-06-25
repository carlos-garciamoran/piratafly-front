import React, { useEffect } from 'react';

import axios from 'axios';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

import FlightForm from './scenes/FlightForm';
import FlightIndex from './scenes/FlightIndex';

import { useAuth0 } from './services/auth0';

function App() {
  const { loading, getTokenSilently } = useAuth0();

  async function fetchAuthToken() {
    try {
      const token = await getTokenSilently();

      axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URI;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch {}
  }

  useEffect(() => { !loading && fetchAuthToken() });

  // V1.1: enhance design (e.g. show spinner)
  if (loading) {
    return <h1 id="waiting-room">Cargando...</h1>;
  }

  return (
    <>
    <header>
      <Header />
    </header>

    <main>
      <Switch>
        {/* V1.1: create a publicly accessible home-page */}
        <Route exact path="/">
          <Redirect to="/flights" />
        </Route>

        <PrivateRoute path="/flights" component={FlightIndex} />
        <PrivateRoute path="/flight/new" component={FlightForm} />
      </Switch>
    </main>

    <footer>
      <span>
        © { new Date().getFullYear() } <span className="font-semibold text-yellow">PirataFly</span>
      </span>

      <div>
        <Link to="/privacy-policy">Política de privacidad</Link>
        <span> | </span>
        <a href="mailto:hello@piratafly.com">Contacto</a>
      </div>
    </footer>
    </>
  );
}

export default App;
