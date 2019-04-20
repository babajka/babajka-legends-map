import React from 'react';
import { Match } from '@reach/router';

import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import GA from 'components/GA';

import { isDesktopDevice } from 'utils';

const Root = ({ children, onlyMain }) => {
  return (
    <GA>
      {!onlyMain && <Header />}
      <main>{children}</main>
      {!onlyMain && <Footer />}
    </GA>
  );
};

export default props => (
  <Match path="/legends/:legendId">
    {({ match }) => <Root {...props} onlyMain={match && !isDesktopDevice()} />}
  </Match>
);
