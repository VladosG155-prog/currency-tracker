import { FC } from 'react';
import Icon from '@components/Icon';
import { useAppSelector } from '@root/store/hooks';
import { Themes } from '@root/types/enums';

import styles from './Banner.module.scss';

interface IBannerProps {
  title: string;
  description: string;
}

const Banner: FC<IBannerProps> = ({ title, description }) => {
  const theme = useAppSelector((state) => state.global.theme);

  const isDarkTheme = theme === Themes.Dark;

  return (
    <div className={styles.root}>
      <div className={styles.banner}>
        <div className={styles.bannerWrap}>
          <div className={styles.textWrap}>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>

          <Icon
            iconName={isDarkTheme ? 'Logo' : 'LightLogo'}
            width={300}
            height={300}
            offset={1}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;

