import { FC, ReactNode } from 'react';

import styles from './Button.module.scss';

interface IButtonProps {
  children: ReactNode;
  variant: 'success' | 'decline' | 'default';
  onClick: () => void;
}

export const Button: FC<IButtonProps> = ({
  children,
  variant = 'default',
  onClick,
}) => (
  <button
    className={styles.root}
    onClick={onClick}
    data-variant={variant}
    type="button"
  >
    {children}
  </button>
);

