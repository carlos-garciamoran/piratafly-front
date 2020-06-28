import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBars, faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons'

import App from './App';

import { Auth0Provider } from './services/auth0';
import config from './services/auth0/config';
import history from './services/history';
import * as serviceWorker from './serviceWorker';

import './styles.css';


library.add(fab, faBars, faCaretDown, faUser);

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    audience={config.audience}
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);

serviceWorker.register();
