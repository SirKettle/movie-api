import { convertItunesUrl } from '../itunes/utils';

export const mapResultLocation = ({ movie, amazonAssociateId }) => ({ icon, name, url }) => {
  const service = {
    icon,
    name,
    url: url.replace(/tag=utellycom00-21/gi, `tag=${amazonAssociateId}`),
  };

  switch (name) {
    case 'ITunes':
      return {
        icon,
        name,
        url: convertItunesUrl(url, movie),
      };

    default:
      return service;
  }
};

export const getStreamingServices = (results = [], { movie, amazonAssociateId }) => {
  const bestMatch = results[0];

  if (bestMatch) {
    return bestMatch.locations
      .filter(res => Boolean(res && res.name && res.url))
      .map(mapResultLocation({ movie, amazonAssociateId }));
  }

  return void 0;
};
