import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Redirect } from '@reach/router';

import Root from 'components/layout/Root';
import Map from 'components/Map';
import LegendModal from 'components/LegendModal';

import 'styles.scss';
import legends from 'legends.json';

const legendsById = legends.reduce((acc, cur) => {
  acc[cur.id] = cur;
  return acc;
}, {});

const App = () => (
  <Root>
    <Router>
      <Map path="legends" legends={legends}>
        <LegendModal path=":legendId" legendsById={legendsById} />
      </Map>
      <Redirect noThrow from="*" to="legends" />
    </Router>
  </Root>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
