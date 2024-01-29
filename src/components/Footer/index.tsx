import text from '@constants/text.json';
import { Themes } from '@root/@types/enums';
import { useAppSelector } from '@root/store/hooks';

import Icon from '../Icon';

import styles from './Footer.module.scss';

export const Footer = () => {
  const theme = useAppSelector((state) => state.global.theme);
  const isDarkTheme = theme === Themes.Dark;

  const renderList = (list: string[]) =>
    list.map((listItem) => <p key={listItem}>{listItem}</p>);

  return (
    <div className={styles.root}>
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
        <p> {text.shared.footer.description}</p>
      </div>
      {text.shared.footer.columns.map((element) => (
        <div key={element.title} className={styles.column}>
          <h2>{element.title}</h2>
          {renderList(element.list)}
        </div>
      ))}
    </div>
  );
};
