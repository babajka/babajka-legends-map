import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Router, Redirect } from '@reach/router';

import Root from 'components/layout/Root';
import Map from 'components/Map';
import LegendModal from 'components/LegendModal';

import legends from 'data/legends.json';
import emojis from 'data/emojis.json';
import 'styles.scss';

import * as serviceWorker from './serviceWorker';

const legendsById = legends.reduce((acc, cur) => {
  acc[cur.id] = cur;
  return acc;
}, {});

const App = () => {
  useEffect(() => {
    // Learn more about service workers: https://cra.link/PWA
    serviceWorker.register({
      onUpdate: registration => {
        const waitingServiceWorker = registration.waiting;

        if (waitingServiceWorker) {
          waitingServiceWorker.addEventListener('statechange', event => {
            if (event.target.state === 'activated') {
              // A new service worker has taken control, reload the page
              window.location.reload();
            }
          });

          // Force the waiting service worker to become the active one
          waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
        }
      },
    });
  }, []);

  return (
    <Router>
      <Root default>
        <Map path="legends" legends={legends} emojis={emojis}>
          <LegendModal path=":legendId" legendsById={legendsById} emojis={emojis} />
        </Map>
        <Redirect noThrow from="*" to="legends" />
      </Root>
    </Router>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
