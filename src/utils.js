export const getGoogleMapsUrl = ([lng, lat], zoom = 7) =>
  `http://www.google.com/maps/place/${lat},${lng}/@${lat},${lng},${zoom}z`;
