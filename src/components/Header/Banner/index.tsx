import { FC } from 'react';
import { Icon } from '@components/Icon';
import { useMediaQuery } from '@root/hooks/useMediaQuery';
import { useAppSelector } from '@root/store/hooks';
import { Themes } from '@root/types/enums';

import styles from './Banner.module.scss';

interface IBannerProps {
  title: string;
  description: string;
}

export const Banner: FC<IBannerProps> = ({ title, description }) => {
  const theme = useAppSelector((state) => state.global.theme);

  const isTablet = useMediaQuery('(max-width: 768px)');

  const isDarkTheme = theme === Themes.Dark;

  return (
    <div className={styles.root}>
      <div className={styles.banner}>
        <div className={styles.bannerWrap}>
          <div className={styles.textWrap}>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          {!isTablet && (
            <Icon
              iconName={isDarkTheme ? 'Logo' : 'LightLogo'}
              width={300}
              height={300}
              offset={1}
            />
          )}
        </div>
      </div>
    </div>
  );
};

