import { useEffect } from 'react';
import text from '@constants/text.json';
import { Screens, Themes } from '@root/constants/enums';
import { useMediaQuery } from '@root/hooks/useMediaQuery';
import { useAppSelector } from '@store/hooks';

import { Icon } from '../Icon';

import { Banner } from './Banner';
import { Menu } from './Menu';

import styles from './Header.module.scss';

const Header = () => {
  const theme = useAppSelector((state) => state.global.theme);

  const isTablet = useMediaQuery(Screens.Tablet);
  const lastTimeUpdate = useAppSelector(
    (state) => state.currency.lastTimeUpdate,
  );

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const isDarkTheme = theme === Themes.Dark;

  const lastTimeUpdatedAt = `${text.shared.header.updatedAt} ${new Date(
    lastTimeUpdate,
  ).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  return (
    <header data-testid="header" className={styles.root}>
      <div className={styles.topBar}>
        <Icon
          iconName={isDarkTheme ? 'Logo' : 'LightLogo'}
          width={isTablet ? 16 : 40}
          height={isTablet ? 16 : 40}
          offset={1}
        />

        <Menu isDarkTheme={isDarkTheme} isTablet={isTablet} />
      </div>
      <Banner
        title={text.shared.title}
        description={text.shared.header.description}
      />
      <div className={styles.lastUpdated}>
        <div className={styles.pulseCircle} />
        <p>{lastTimeUpdatedAt}</p>
      </div>
    </header>
  );
};
export default Header;
