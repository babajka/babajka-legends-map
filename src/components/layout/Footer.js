import React from 'react';

import StopClickPropagation from 'lib/components/StopClickPropagation';
import Logo from 'assets/logo/Logo';

import { zIndexes, zIndexElements } from 'consts';

const Footer = () => (
  <div className="wir" style={{ zIndex: zIndexes[zIndexElements.LABELS] }}>
    <Logo size={32} className="wir__logo" />
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

export default Footer;
