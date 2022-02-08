/**
 * Capitalize first letter of string.
 * @param stringVar String to capitalize.
 * @param locale Navigator.
 */
export const capitalizeFirstLetter = (stringVar: string, locale: string = navigator.language): string => {
  const [first, ...rest] = stringVar;
  return first.toLocaleUpperCase(locale) + rest.join('');
};
