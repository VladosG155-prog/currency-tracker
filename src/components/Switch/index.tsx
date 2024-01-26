import { FC } from 'react';
import classNames from 'classnames';

import styles from './Switch.module.scss';

interface IProps {
  onChange: () => void;
  checked: boolean;
}

const Switch: FC<IProps> = ({ onChange, checked }) => (
  <label className={styles.switch}>
    <input checked={checked} onChange={onChange} type="checkbox" />
    <span className={classNames(styles.slider, styles.round)} />
  </label>
);

export default Switch;
