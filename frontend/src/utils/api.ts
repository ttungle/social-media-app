export function getBaseApiURL(path?: string) {
    return Boolean(path) ? `${import.meta.env.VITE_BASE_API_URL}/api${path}` : `${import.meta.env.VITE_BASE_API_URL}/api`;
  }
  
  export function getMediaUrl(path: string | undefined) {
    if (!path) return null;
  
    if (path.startsWith('http')) return path;
  
    return `${import.meta.env.VITE_BASE_API_URL}${path}`;
  }