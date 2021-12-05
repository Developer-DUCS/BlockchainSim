// Adds elements to the end of an array
// Returns the new array copy - does not modify the original
const add_element_to_array = (array, element) => {
  let copy_array = array.slice();
  copy_array.push(element);
  return copy_array;
};

// Gets an element from an array given its index
// Returns the element
const get_element_from_array = (array, index) => {
  let copy_array = array.slice();
  return copy_array[index];
};

function reduce(array, init, f) {
  var accum = init;
  forEach(array, function (element) {
    accum = f(accum, element);
  });
  return accum;
}

function forEach(array, f) {
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    f(item);
  }
}

export { add_element_to_array, get_element_from_array, reduce };
