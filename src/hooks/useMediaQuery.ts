import { useMatchedMedia } from './useMatchedMedia';

export function useMediaQuery(
  query: string,
  onMatchFound?: () => void,
  onMatchNotFound?: () => void,
) {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia === 'undefined'
  ) {
    return false;
  }

  const modifiedQuery = query.replace(/^@media( ?)/m, '');

  return useMatchedMedia(modifiedQuery, onMatchFound, onMatchNotFound);
}
