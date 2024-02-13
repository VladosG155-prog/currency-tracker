import { Screens, Themes } from '@root/constants/enums';
import { useMediaQuery } from '@root/hooks/useMediaQuery';
import { useAppSelector } from '@store/hooks';

import { Icon } from '../Icon';

import { columns, text } from './Footer.config';
import { FooterTab } from './FooterTab';

import styles from './Footer.module.scss';

export const Footer = () => {
  const theme = useAppSelector((state) => state.global.theme);
  const isDarkTheme = theme === Themes.Dark;

  const isTablet = useMediaQuery(Screens.Tablet);

  return (
    <div data-testid="footer" className={styles.root}>
      <div className={styles.about}>
        <div className={styles.logo}>
          <Icon
            iconName={isDarkTheme ? 'Logo' : 'LightLogo'}
            width={40}
            height={40}
            offset={1}
          />

          <h3>{text.title}</h3>
        </div>
        {!isTablet && <p> {text.description}</p>}
      </div>
      {columns.map(({ title, list }) => (
        <FooterTab key={title} title={title} tabs={list} isTablet={isTablet} />
      ))}
    </div>
  );
};
