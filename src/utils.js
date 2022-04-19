export const shortenNumber = (number) => {
  let shortenedNumber;
  let abbreviation;
  if (number < 1000) {
    shortenedNumber = number;
    abbreviation = "";
  } else if (number < 100000) {
    shortenedNumber = (number / 1000).toFixed(1);
    abbreviation = "k";
  }
  shortenedNumber += abbreviation;

  return shortenedNumber;
};
