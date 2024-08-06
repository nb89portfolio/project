function getCapatalizedStrings(strings: String[]) {
  return strings.map((word) => {
    const firstChararacter = word.charAt(0);
    const capatalizedCharacter = firstChararacter.toUpperCase();
    const otherCharacters = word.slice(1);
    const rebuiltString = capatalizedCharacter + otherCharacters;

    return rebuiltString;
  });
}

export default function parseUrlString(pathname: string) {
  const noSlashString = pathname.replaceAll("/", " ");
  const lowerCaseString = noSlashString.toLowerCase();
  const seperatedStrings = lowerCaseString.split(" ");
  const capatalizedStrings = getCapatalizedStrings(seperatedStrings);
  const rebuildUrl = capatalizedStrings.join(" ");

  return rebuildUrl;
}
