import { FC } from 'react';
import classNames from 'classnames';

import { ISwitchProps } from './Switch.interface';

import styles from './Switch.module.scss';

const Switch: FC<ISwitchProps> = ({ onChange, checked }) => (
  <label data-testid="switch" className={styles.switch}>
    <input checked={checked} onChange={onChange} type="checkbox" />
    <span
      data-testid="switch-slider"
      className={classNames(styles.slider, styles.round)}
    />
  </label>
);

export default Switch;
