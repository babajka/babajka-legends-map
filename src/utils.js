import ReactGA from 'react-ga';

export const getGoogleMapsUrl = ([lng, lat], zoom = 7) =>
  `http://www.google.com/maps/place/${lat},${lng}/@${lat},${lng},${zoom}z`;

export const pageView = options => {
  if (!process.env.REACT_APP_WIR_ENV) {
    return;
  }
  ReactGA.ga('send', 'pageview', window.location.pathname, options);
};

export const track = options => {
  if (!process.env.REACT_APP_WIR_ENV) {
    return;
  }
  ReactGA.event({ category: 'Legends Map', ...options });
};

export const isDesktopDevice = () => window.innerHeight < window.innerWidth;

export const getImageUrl = (id, w = 'auto') =>
  `https://res.cloudinary.com/wir-by/image/upload/w_${w},q_auto,f_auto/${id}`;
