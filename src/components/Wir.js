import React from 'react';

import { zIndexes, zIndexElements } from '../constants';

const Wir = () => (
  <div className="wir" style={{ zIndex: zIndexes[zIndexElements.LABELS] }}>
    <img className="wir__logo" src="./images/logo.png" alt="Wir.by" />
    <div>
      зроблена камандай
      <a
        className="wir__link"
        href="https://wir.by?utm_source=map"
        target="_blank"
        rel="noreferrer noopener"
      >
        wir.by
      </a>
    </div>
  </div>
);

export default Wir;
