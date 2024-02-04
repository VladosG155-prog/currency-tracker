export const truncateToTwoSignificantDigits = (number: number) => {
  const exponent = Math.floor(Math.log10(Math.abs(number)));
  const multiplier = 10 ** (2 - exponent);

  return Math.round(number * multiplier) / multiplier;
};
