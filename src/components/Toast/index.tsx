import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Toast.module.scss';

interface IToastProps {
  title: string;
  onClose: () => void;
}

const Toast: FC<IToastProps> = ({ title, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return createPortal(
    <div className={styles.toast}>
      {title}
      <span className={styles.toastEnd} />
    </div>,
    document.body,
  );
};

export default Toast;

