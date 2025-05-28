/**
 * Process a claims path pointer
 * @param path The claims path pointer array
 * @param data The credential data
 * @returns Array of selected JSON elements
 * @throws Error if processing should be aborted according to the specification
 */
export const pathMatch = (
  path: Array<string | number | null>,
  data: any,
): any[] => {
  // Start with the root element
  let selectedElements: any[] = [data];

  // Process the path from left to right
  for (const component of path) {
    const nextSelectedElements: any[] = [];

    // Process each currently selected element
    for (const element of selectedElements) {
      // String: select the element with the key in the currently selected elements
      if (typeof component === 'string') {
        if (
          element === null ||
          typeof element !== 'object' ||
          Array.isArray(element)
        ) {
          // According to spec: "If any of the currently selected element(s) is not an object,
          // abort processing and return an error."
          throw new Error(
            'Path component requires object but found non-object element',
          );
        }

        if (component in element) {
          nextSelectedElements.push(element[component]);
        }
      }
      // null: select all elements of the currently selected arrays
      else if (component === null) {
        if (element === null || !Array.isArray(element)) {
          // According to spec: "If any of the currently selected element(s) is not an array,
          // abort processing and return an error."
          throw new Error(
            'Null path component requires array but found non-array element',
          );
        }

        nextSelectedElements.push(...element);
      }
      // number: select the element at the index in the currently selected arrays
      else if (
        typeof component === 'number' &&
        component >= 0 &&
        Number.isInteger(component)
      ) {
        if (element === null || !Array.isArray(element)) {
          // According to spec: "If any of the currently selected element(s) is not an array,
          // abort processing and return an error."
          throw new Error(
            'Numeric path component requires array but found non-array element',
          );
        }
        // If the index does not exist in a selected array, remove that array from the selection
        if (component < element.length) {
          nextSelectedElements.push(element[component]);
        }
      }
      // Invalid component type
      else {
        // According to spec: "If the component is anything else, abort processing and return an error."
        throw new Error(`Invalid path component: ${component}`);
      }
    }

    // If no elements were selected, abort processing
    if (nextSelectedElements.length === 0) {
      // According to spec: "If the set of elements currently selected is empty,
      // abort processing and return an error."
      throw new Error('No elements selected after processing path component');
    }

    // Update the selected elements for the next iteration
    selectedElements = nextSelectedElements;
  }

  return selectedElements;
};
