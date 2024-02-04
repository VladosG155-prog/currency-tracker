import { FC, ReactNode } from 'react';

import styles from './Button.module.scss';

interface IButtonProps {
  children: ReactNode;
  variant: 'success' | 'decline' | 'default';
  onClick: () => void;
  testId?: string;
}

export const Button: FC<IButtonProps> = ({
  children,
  variant = 'default',
  onClick,
  testId,
}) => (
  <button
    className={styles.root}
    onClick={onClick}
    data-variant={variant}
    type="button"
    data-testid={testId}
  >
    {children}
  </button>
);

