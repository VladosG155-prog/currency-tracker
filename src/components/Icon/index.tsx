import { FC, lazy, memo, Suspense } from 'react';

interface IIconProps {
  iconName: string;
  width?: number;
  height?: number;
  offset?: number;
}

const Icon: FC<IIconProps> = ({
  iconName,
  width = 30,
  height = 30,
  offset = 0,
}) => {
  const LazyIcon = lazy(
    () => import(/* webpackMode: 'eager' */ `@assets/${iconName}.svg`),
  );

  return (
    <Suspense>
      <LazyIcon width={width} height={height} offset={offset} />
    </Suspense>
  );
};

export default memo(Icon);
