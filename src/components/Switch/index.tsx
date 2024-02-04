import { FC } from 'react';
import classNames from 'classnames';

import styles from './Switch.module.scss';

interface IProps {
  onChange: () => void;
  checked: boolean;
}

const Switch: FC<IProps> = ({ onChange, checked }) => (
  <label data-testid="switch" className={styles.switch}>
    <input checked={checked} onChange={onChange} type="checkbox" />
    <span
      data-testid="switch-slider"
      className={classNames(styles.slider, styles.round)}
    />
  </label>
);

export default Switch;

