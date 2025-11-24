// Import all avatar images
import amyrobson from '../assets/images/avatars/image-amyrobson.png';
import juliusomo from '../assets/images/avatars/image-juliusomo.png';
import maxblagun from '../assets/images/avatars/image-maxblagun.png';
import ramsesmiron from '../assets/images/avatars/image-ramsesmiron.png';

const avatars = {
  amyrobson,
  juliusomo,
  maxblagun,
  ramsesmiron
};

export const getAvatarUrl = (username) => {
  return avatars[username] || avatars.juliusomo;
};

export default avatars;
