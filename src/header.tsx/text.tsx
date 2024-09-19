import getCapatalizedStrings from './capatalize';

export default function getText(pathname: string) {
  const removedSlash = pathname.replaceAll('/', ' ');
  const lowercase = removedSlash.toLowerCase();
  const splitStrings = lowercase.split(' ');
  const recapatalizedStrings = getCapatalizedStrings(splitStrings);
  const builtUrl = recapatalizedStrings.join(' ');

  const isEmpty = builtUrl === ' ';

  const url = isEmpty ? 'Home' : builtUrl;

  return url;
}
