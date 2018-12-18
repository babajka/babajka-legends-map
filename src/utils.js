import ReactGA from 'react-ga';

export const getGoogleMapsUrl = ([lng, lat], zoom = 7) =>
  `http://www.google.com/maps/place/${lat},${lng}/@${lat},${lng},${zoom}z`;

export const track = options => {
  if (!process.env.REACT_APP_WIR_ENV) {
    return;
  }
  ReactGA.event({
    category: 'Legends Map',
    ...options,
  });
};

export const createConstants = (...constants) =>
  constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});

export const isMobileDevice = () => window.innerHeight > window.innerWidth;
