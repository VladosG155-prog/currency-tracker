import { FC, lazy, memo, Suspense } from 'react';

import { IIconProps } from './Icon.interface';

export const Icon: FC<IIconProps> = memo(
  ({ iconName, width = 30, height = 30, offset = 0 }) => {
    const LazyIcon = lazy(
      () => import(/* webpackMode: 'eager' */ `@assets/${iconName}.svg`),
    );

    return (
      <Suspense>
        <LazyIcon
          data-testid="lazy-icon"
          width={width}
          height={height}
          offset={offset}
        />
      </Suspense>
    );
  },
);
