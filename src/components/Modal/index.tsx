import { FC, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

interface IModalProps {
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: FC<IModalProps> = ({ onClose, title, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'visible';
    };
  }, []);

  return createPortal(
    <div onClick={onClose} className={styles.overlay}>
      <div
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        className={styles.root}
      >
        <h2>{title}</h2>
        <button type="button" className={styles.close} onClick={onClose}>
          &times;
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
