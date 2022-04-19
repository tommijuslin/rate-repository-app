export const shortenNumber = (number) => {
  let shortenedNumber;
  let abbreviation;
  if (number < 1000) {
    shortenedNumber = number;
    abbreviation = "";
  } else if (number < 1000000) {
    shortenedNumber = (number / 1000).toFixed(1);
    abbreviation = "k";
  } else {
    shortenedNumber = (number / 1000000).toFixed(1);
    abbreviation = "M";
  }
  shortenedNumber += abbreviation;

  return shortenedNumber;
};
