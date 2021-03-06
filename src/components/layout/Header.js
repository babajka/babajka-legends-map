import React from 'react';

import { zIndexes, zIndexElements } from 'consts';

import './header.scss';

const Header = () => (
  <div className="header" style={{ zIndex: zIndexes[zIndexElements.LABELS] }}>
    Мапа
    <br />
    беларускіх
    <br />
    легенд
  </div>
);

export default Header;
