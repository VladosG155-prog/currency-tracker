import {
 FC, lazy, memo, Suspense 
} from 'react';

interface IIconProps {
  iconName: string;
  width?: number;
  height?: number;
  offset?: number;
}

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

