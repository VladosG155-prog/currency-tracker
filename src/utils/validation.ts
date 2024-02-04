export const validationNumber = (value: number, min: number, max: number) => {
  const errorText = `The value must be between ${min} and ${max}`;

  if (value < min || value > max || !value) return errorText;
  return '';
};

