import text from '@constants/text.json';
import { useMediaQuery } from '@root/hooks/useMediaQuery';
import { Screens, Themes } from '@root/types/enums';
import { useAppSelector } from '@store/hooks';

import { Icon } from '../Icon';

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

          <h3>{text.shared.title}</h3>
        </div>
        {!isTablet && <p> {text.shared.footer.description}</p>}
      </div>
      {text.shared.footer.columns.map((element) => (
        <FooterTab
          key={element.title}
          title={element.title}
          tabs={element.list}
          isTablet={isTablet}
        />
      ))}
    </div>
  );
};
