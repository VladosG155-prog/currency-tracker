import { ReactNode } from 'react';

export interface IModalProps {
  onClose: () => void;
  title: string;
  children: ReactNode;
}
