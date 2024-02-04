export const optionsMapper = (obj: any) => ({
    label: obj.name || obj.title || '',
    value: obj.code || '',
  });

