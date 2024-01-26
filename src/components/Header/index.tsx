import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Switch from '@components/Switch';
import routes from '@constants/routes.json';
import text from '@constants/text.json';
import { Themes } from '@root/@types/enums';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changeTheme } from '@store/slices/globalSlice';
import classNames from 'classnames';

import Icon from '../Icon';

import Banner from './Banner';

import styles from './Header.module.scss';

const Header = () => {
  const theme = useAppSelector((state) => state.global.theme);
  const dispatch = useAppDispatch();

  const lastTimeUpdate = useAppSelector(
    (state) => state.currency.lastTimeUpdate,
  );

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const isDarkTheme = theme === Themes.Dark;

  const toggleSwitch = () => {
    const newTheme = isDarkTheme ? Themes.Light : Themes.Dark;
    dispatch(changeTheme(newTheme));
    localStorage.setItem('theme', newTheme);
  };

  const lastTimeUpdatedAt = `${text.shared.header.updatedAt} ${new Date(
    lastTimeUpdate,
  ).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  return (
    <header className={styles.root}>
      <div className={styles.topBar}>
        <Icon
          iconName={isDarkTheme ? 'Logo' : 'LightLogo'}
          width={40}
          height={40}
          offset={1}
        />

        <nav className={styles.nav}>
          {routes.nav.map((route) => (
            <NavLink
              className={({ isActive }) =>
                classNames(styles.link, {
                  [styles.active]: isActive,
                })
              }
              key={route.name}
              to={route.route}
            >
              {route.name}
            </NavLink>
          ))}
        </nav>
        <Switch checked={isDarkTheme} onChange={toggleSwitch} />
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
