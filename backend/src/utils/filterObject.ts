export const filterObject = (obj, ...allowedFields) => {
  const object = {};

  Object.keys(obj).forEach((item) => {
    if (allowedFields.includes(item)) object[item] = obj[item];
  });

  return object;
};
