import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Redirect } from '@reach/router';

import Root from 'components/layout/Root';
import Map from 'components/Map';
import LegendModal from 'components/LegendModal';

import 'styles.scss';
import legends from 'data/legends.json';
import emojis from 'data/emojis.json';

const legendsById = legends.reduce((acc, cur) => {
  acc[cur.id] = cur;
  return acc;
}, {});

const App = () => (
  <Root>
    <Router>
      <Map path="legends" legends={legends} emojis={emojis}>
        <LegendModal path=":legendId" legendsById={legendsById} emojis={emojis} />
      </Map>
      <Redirect noThrow from="*" to="legends" />
    </Router>
  </Root>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
