/**
 * Format a number as currency
 * @param value - The numeric value to format
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale for formatting (default: 'en-US')
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Format a number with thousands separators
 * @param value - The numeric value to format
 * @param locale - The locale for formatting (default: 'en-US')
 */
export function formatNumber(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Format a date to a localized string
 * @param date - The date to format
 * @param options - Intl.DateTimeFormat options
 * @param locale - The locale for formatting (default: 'en-US')
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  locale: string = 'en-US'
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Truncate a string to a maximum length
 * @param str - The string to truncate
 * @param maxLength - Maximum length before truncation
 * @param suffix - The suffix to append (default: '...')
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Convert a string to title case
 * @param str - The string to convert
 */
export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}

/**
 * Generate initials from a name
 * @param name - The full name
 * @param maxInitials - Maximum number of initials (default: 2)
 */
export function getInitials(name: string, maxInitials: number = 2): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, maxInitials)
    .join('');
}
