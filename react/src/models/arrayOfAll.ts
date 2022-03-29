/**
 * Make sure array has all types from a union.
 */
export function arrayOfAll<T>() {
  return <U extends T[]>(
    array: U & ([T] extends [U[number]] ? unknown : 'Invalid'),
  ) => array;
}
