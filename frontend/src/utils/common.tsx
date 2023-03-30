export function formatStringWithMaxLength(content: string, maxLength: number) {
  if (content === undefined) return '';
  if (maxLength < 0 || content.length <= maxLength) return content;

  return content.substring(0, maxLength) + '...';
}

export function getBaseApiURL(path?: string) {
  return Boolean(path) ? `${import.meta.env.VITE_BASE_API_URL}${path}` : import.meta.env.VITE_BASE_API_URL;
}

export function filterObject(obj: any, ...allowFields: any[]) {
  if (!obj) return {};
  let object: any = {};

  Object.keys(obj).forEach((key) => {
    if (allowFields.includes(key)) object[key] = obj[key];
  });

  return object;
}