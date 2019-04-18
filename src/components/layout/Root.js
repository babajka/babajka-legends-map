import React from 'react';

import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import GA from 'components/GA';

const Root = ({ children }) => {
  return (
    <GA>
      <Header />
      <main>{children}</main>
      <Footer />
    </GA>
  );
};

export default Root;
