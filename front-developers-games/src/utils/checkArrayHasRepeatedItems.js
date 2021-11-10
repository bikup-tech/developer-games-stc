export default function checkArrayHasRepeatedItems(array) {
  for (let i = 0; i < array.length; i += 1) {
    for (let k = i + 1; k < array.length; k += 1) {
      if (array[i] === array[k]) {
        return true;
      }
    }
  }
  return false;
}
