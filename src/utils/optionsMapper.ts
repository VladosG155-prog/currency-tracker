export const optionsMapper = (obj: any) => {
  return {
    label: obj.name || obj.title || '',
    value: obj.code || '',
  };
};

