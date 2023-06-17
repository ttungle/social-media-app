const timeOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
} as Intl.DateTimeFormatOptions;

export function formatStringWithMaxLength(content: string, maxLength: number) {
  if (content === undefined) return '';
  if (maxLength < 0 || content.length <= maxLength) return content;

  return content.substring(0, maxLength) + '...';
}

export function formatDateString(
  dateString: string | undefined,
  options: Intl.DateTimeFormatOptions | 'hide-time' = timeOptions,
  locale: Intl.LocalesArgument = 'en'
) {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (options === 'hide-time') {
    const hideTimeOptions = { dateStyle: 'long' } as Intl.DateTimeFormatOptions;
    return date.toLocaleDateString(locale, hideTimeOptions);
  }

  return date.toLocaleDateString(locale, options);
}

export function filterObject(obj: any, ...allowFields: any[]) {
  if (!obj) return {};
  let object: any = {};

  Object.keys(obj).forEach((key) => {
    if (allowFields.includes(key)) object[key] = obj[key];
  });

  return object;
}

export const convertMonth = (monthNumber: number | string, currentLanguage: string) => {
  const date = new Date();
  date.setMonth(Number(monthNumber) - 1);

  return date.toLocaleString(currentLanguage === 'en' ? 'en-US' : 'vi-VN', {
    month: 'long',
  });
};
