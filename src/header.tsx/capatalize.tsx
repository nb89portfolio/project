export default function getCapatalizedStrings(strings: String[]) {
  const recapatalizedStrings = strings.map((word) => {
    const firstChararacter = word.charAt(0);
    const capatalizedCharacter = firstChararacter.toUpperCase();
    const otherCharacters = word.slice(1);
    const string = capatalizedCharacter + otherCharacters;

    return string;
  });

  return recapatalizedStrings;
}
