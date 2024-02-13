import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Switch } from '@components/Switch';
import { Themes } from '@root/constants/enums';
import { useAppDispatch } from '@root/store/hooks';
import { changeTheme } from '@root/store/slices/globalSlice';
import classNames from 'classnames';

import { navigation } from './Menu.config';
import { IMenuProps } from './Menu.interface';

import styles from './Menu.module.scss';

export const Menu: FC<IMenuProps> = ({ isDarkTheme, isTablet }) => {
  const dispatch = useAppDispatch();

  const [isActiveBurger, setIsActiveBurger] = useState(false);

  const toggleSwitch = () => {
    const newTheme = isDarkTheme ? Themes.Light : Themes.Dark;
    dispatch(changeTheme(newTheme));
  };

  const toggleBurger = () => {
    setIsActiveBurger((prev) => !prev);
  };

  return (
    <>
      <div
        className={classNames(styles.navSwitch, {
          [styles.mobile]: isTablet,
          [styles.active]: isActiveBurger,
        })}
      >
        <nav data-testid="navigation" className={styles.nav}>
          {navigation.map(({ name, route, testId }) => (
            <NavLink
              className={({ isActive }) =>
                classNames(styles.link, {
                  [styles.active]: isActive,
                })
              }
              data-testid={`navigation-${testId}`}
              key={name}
              to={route}
              onClick={isActiveBurger ? toggleBurger : () => null}
            >
              {name}
            </NavLink>
          ))}
        </nav>
        <Switch checked={isDarkTheme} onChange={toggleSwitch} />
      </div>

      {isTablet && (
        <div
          onClick={toggleBurger}
          className={classNames(styles.burger, {
            [styles.active]: isActiveBurger,
          })}
        >
          <span />
          <span />
          <span />
        </div>
      )}
    </>
  );
};
