import React from 'react';

import StopClickPropagation from './common/StopClickPropagation';
import { zIndexes, zIndexElements } from '../constants';

const Wir = () => (
  <div className="wir" style={{ zIndex: zIndexes[zIndexElements.LABELS] }}>
    <img className="wir__logo" src="./favicon.png" alt="Wir.by" />
    <StopClickPropagation>
      зроблена камандай
      <a
        className="wir__link"
        href="https://wir.by?utm_source=map"
        target="_blank"
        rel="noreferrer noopener"
      >
        wir.by
      </a>
    </StopClickPropagation>
  </div>
);

export default Wir;
