import PropTypes from 'prop-types';

import createConstants from 'lib/utils/createConstants';

export const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoidWxhZGJvaGRhbiIsImEiOiJjam9kMDQ1NzYxOTYyM3FvanhpOXE1cDIzIn0.JiXb8lR9e53GqZz51PZdaQ';

export const GA_ID = {
  staging: 'UA-117143376-4',
  production: 'UA-117143376-3',
};

const STYLE_PREFIX = 'mapbox://styles/uladbohdan';

export const LIGHT_STYLE = `${STYLE_PREFIX}/cjpjxmip00js22snnkwi85d4i`;

export const MINSK = [27.5615, 53.9045];

export const BELARUS_BOUNDS = [
  23.178357, // west
  51.261881, // south
  32.776784, // east
  56.139922, // north
];

export const EMOJI_SCALE_RATE = 4.5;

export const LegendShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
});

export const zIndexElements = createConstants(
  'MAP',
  'MARKER',
  'CONTROLS',
  'LABELS',
  'LEGENDS_MODAL'
);

export const zIndexes = [
  zIndexElements.MAP,
  zIndexElements.MARKER,
  zIndexElements.CONTROLS,
  zIndexElements.LEGENDS_MODAL,
  zIndexElements.LABELS,
].reduce((acc, cur, index) => {
  acc[cur] = index;
  return acc;
}, {});
