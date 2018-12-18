import React from 'react';

import { zIndexes, zIndexElements } from '../constants';

const Title = () => (
  <div className="title" style={{ zIndex: zIndexes[zIndexElements.LABELS] }}>
    Мапа
    <br />
    беларускіх
    <br />
    легенд
  </div>
);

export default Title;
