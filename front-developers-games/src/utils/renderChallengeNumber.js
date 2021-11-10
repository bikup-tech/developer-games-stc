export default function renderChallengeNumber(number) {
  let renderedNumber = '';

  if (number) {
    if (number.toString().length > 1) {
      renderedNumber = `#${number}`;
    } else {
      renderedNumber = `#0${number}`;
    }
  }

  return renderedNumber;
}
