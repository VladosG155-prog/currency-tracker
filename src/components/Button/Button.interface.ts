import { ReactNode } from 'react';

export interface IButtonProps {
  children: ReactNode;
  variant: 'success' | 'decline' | 'default';
  onClick: () => void;
  testId?: string;
}
