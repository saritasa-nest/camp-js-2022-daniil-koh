/**
 * Capitalize first char of string.
 * @param stringVar String to capitalize first char.
 */
export function capitalizeFirstLetter(stringVar: string): string {
  return stringVar.charAt(0).toUpperCase() + stringVar.slice(1);
}
