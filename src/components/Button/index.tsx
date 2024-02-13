import { FC, memo } from 'react';

import { IButtonProps } from './Button.interface';

import styles from './Button.module.scss';

export const Button: FC<IButtonProps> = memo(
  ({ children, variant = 'default', onClick, testId }) => (
    <button
      className={styles.root}
      onClick={onClick}
      data-variant={variant}
      type="button"
      data-testid={testId}
    >
      {children}
    </button>
  ),
);
