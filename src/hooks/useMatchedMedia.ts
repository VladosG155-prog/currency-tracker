import { useEffect, useMemo, useState } from 'react';

export function useMatchedMedia(
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
