import { pick } from 'ramda';
import { convertItunesUrl } from '../itunes/utils';

export const mapResultLocation = movie => res => {
  switch (res.name) {
    case 'ITunes':
      return {
        ...pick(['name', 'icon'])(res),
        url: convertItunesUrl(res.url, movie),
      };
    default:
      return pick(['name', 'url', 'icon'])(res);
  }
};

export const getStreamingServices = (results = [], movie) => {
  const bestMatch = results[0];

  if (bestMatch) {
    console.log(JSON.stringify(bestMatch.locations));

    return bestMatch.locations.map(mapResultLocation(movie));
  }

  return void 0;
};
