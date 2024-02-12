import { FC } from 'react';
import { Icon } from '@components/Icon';
import { Screens, Themes } from '@root/constants/enums';
import { useMediaQuery } from '@root/hooks/useMediaQuery';
import { useAppSelector } from '@root/store/hooks';

import { IBannerProps } from './Banner.interface';

import styles from './Banner.module.scss';

export const Banner: FC<IBannerProps> = ({ title, description }) => {
  const theme = useAppSelector((state) => state.global.theme);

  const isTablet = useMediaQuery(Screens.Tablet);

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
