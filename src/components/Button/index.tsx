import { FC, memo, useCallback } from 'react';

import { IButtonProps } from './Button.interface';

import styles from './Button.module.scss';

export const Button: FC<IButtonProps> = memo(
  ({ children, variant = 'default', onClick, testId }) => {
    const handleClick = useCallback(() => {
      onClick();
    }, []);

    return (
      <button
        className={styles.root}
        onClick={handleClick}
        data-variant={variant}
        type="button"
        data-testid={testId}
      >
        {children}
      </button>
    );
  },
);
