import React from 'react';
import ReactDOM from 'react-dom';

import GA from 'components/GA';
import Map from 'components/Map';

import 'styles.scss';
import legends from 'legends.json';

const App = () => (
  <GA>
    <Map legends={legends} />
  </GA>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
