/* ACTION TYPES */
export const SEARCH = 'SEARCH';

/* ACTION CREATORS */
export function searching(value) {
  return { type : SEARCH, value }
}