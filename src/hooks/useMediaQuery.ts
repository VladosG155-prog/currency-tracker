import { useEffect, useMemo, useState } from 'react';

function useMatchedMedia(
  query: string,
  onMatchFound?: () => void,
  onMatchNotFound?: () => void,
) {
  const mediaQueryList = useMemo(() => window.matchMedia(query), [query]);
  const [match, setMatch] = useState(mediaQueryList.matches);
  useEffect(() => {
    mediaQueryList.onchange = (event) => {
      const isMatched = event.matches;
      setMatch(isMatched);

      if (isMatched && onMatchFound) onMatchFound();
      if (!isMatched && onMatchNotFound) onMatchNotFound();
    };
  }, [mediaQueryList, onMatchFound, onMatchNotFound]);

  return match;
}

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
