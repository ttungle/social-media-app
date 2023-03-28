export function formatStringWithMaxLength(content: string, maxLength: number) {
  if (content === undefined) return '';
  if (maxLength < 0 || content.length <= maxLength) return content;

  return content.substring(0, maxLength) + '...';
}

export function getBaseApiURL(path?: string) {
  return Boolean(path) ? `${import.meta.env.VITE_BASE_API_URL}${path}` : import.meta.env.VITE_BASE_API_URL;
}