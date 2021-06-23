/**
 * function that return a new array of larger or equal size array with new items
 * @param array of items to be copied into a maxItems size array
 * @param maxItems maximum size of the array
 * @param itemMap map function to mapped continued indexed array with new items
 * @returns newly created array of `maxItems`
 */
export function padArray<T>(array: Array<T>, maxItems: number, itemMap: (index:number) => T): Array<T> {
  if (array.length > maxItems) throw Error('maxItems is less than original array');
  const numberOfItemsToFill = maxItems - array.length;
  let continueIndex = array.length;
  return [...array, ...Array(numberOfItemsToFill).fill(0).map((() => itemMap(continueIndex++)))]
}


export type SeperatorFunc = (index: number) => JSX.Element;

function joinElementInReduce(seperator: SeperatorFunc) {
  return (array: JSX.Element[] | null, element: JSX.Element, index: number)  => {
    return array === null ? [element] : [...array, seperator(index), element];
  }
}

/**
 * join function for JSX elements (Array.join do not work with JSX element)
 * @param array to join a JSX seperator in between existing elements
 * @param seperator JSX Element map function
 * @returns array of JSX element with JSX seperator between
 */
export function joinElement(array: JSX.Element[], seperator: SeperatorFunc): JSX.Element[] {
  return array.reduce(joinElementInReduce(seperator), null) ?? [];
}